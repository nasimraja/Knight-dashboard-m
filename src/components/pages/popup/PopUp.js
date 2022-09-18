import React, { useState,useRef } from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



function PopUp() {

    const slidername = useRef();
    const [error, setError] = useState(false);
   


    const slidenameSave = ()=>{
        // const id = JSON.parse(localStorage.getItem('users'))._id;
        let data ={};

        data['name'] = slidername.current.value;
        data['userid'] = JSON.parse(localStorage.getItem('users'))._id;
     
       
        fetch("http://localhost:5000/api/add/slider/name", {
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
                      
                    });
                }else if(response.status == 500){
                    setError(true);
                }
                else {
                    alert("Network error")
                }
               
            })
    
          
       
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button className='model-butn' onClick={openModal}>Add Slider</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2 className='hding' ref={(_subtitle) => (subtitle = _subtitle)}>Add a Slider</h2>
                <input className='popup-inpt' type='text' placeholder='Enter slider name' ref={slidername}></input>
                {
                                        error &&
                                        <p className="no-user-found">error</p>
                                    }
                <div className='butn-wrp'>
                <button onClick={closeModal}>close</button>
                <button onClick={slidenameSave}>Add Slider</button>
                </div>



            </Modal>
        </div>
    );
}

export default PopUp;