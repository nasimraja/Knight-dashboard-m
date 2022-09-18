import React, { useState,useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config'


function Login() {

    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

   

    const savelogin = ()=>{
        
        let data ={};

        data['email'] = email.current.value;
        data['password'] = password.current.value;
       
        fetch(API_URL + "/login", {
                method: 'POST',
              
                headers: {
                  
                    'Content-Type': 'application/json',
               
                },
                body:JSON.stringify(data)
            }).then((response) => {
               
                if (response.status == 200) {
                    
                    response.json().then((resp) => {
                        console.log("results", resp);
                        setError(false)
                        localStorage.setItem("users",JSON.stringify(resp.user))
                        localStorage.setItem("token",JSON.stringify(resp.auth))
                        navigate("/");
                      
                    });
                }else if(response.status == 501){
                    setError(true);
                }
                
                else {
                    alert("invalid login")
                }
               
            })
    
          
       
    }

    return (
        <div>
            <div className="login-wrp">
                <div className="login">
                    <div className="login-b">
                        <div className="lgn-hding">
                            <h3>Login</h3>
                        </div>
                        <div className="login-box">
                            <input type='text' placeholder='Enter Email' ref={email} />
                            <input type='password' placeholder='Enter Password' ref={password} />
                            <div className="login-c-f">
                             
                                 
                            </div>
                            <div className="login-butn-wrp">
                                <div className="login-butn">
                                    <a type="button" onClick={savelogin} href="#">Login
                                    </a>
                                    {
                                        error &&
                                        <p className="no-user-found">No user found</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;