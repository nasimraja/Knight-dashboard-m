import React, { Component, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


import { ToastContainer } from 'react-toastify';
import jwt from 'jsonwebtoken';
import '../css/style.css'
import '../css/responsive.css'
// import '../css/navbar.css'
import $ from "jquery";
import { Link, Router } from 'react-router-dom';
import logo from '../images/logo.png';
import burger from '../images/burger.png';
import connect from '../images/connect.png';
import gcircle from '../images/gcircle.png';
import crosss from '../images/crosss.png';




const Header = () => {

  const navigate = useNavigate();


  useEffect(() => {



    changePickupStoreMenu();

    function changePickupStoreMenu() {

      var body = $('body'),
        mask = $('<div class="mask"></div>'),
        toggleSlideRight = document.querySelector(".toggle-slide-right"),
        slideMenuRight = document.querySelector(".slide-menu-right"),
        activeNav = '';
      ;
      $('body').append(mask);

      /* slide menu right */
      toggleSlideRight.addEventListener("click", function () {
        $('body').addClass("smr-open");
        $('.mask').fadeIn();
        activeNav = "smr-open";
      });

      /* hide active menu if close menu button is clicked */
      $(document).on('click', ".close-menu", function (el, i) {
        $('body').removeClass(activeNav);
        activeNav = "";
        $('.mask').fadeOut();
      });

    }


  }, [])



// let token =localStorage.getItem("token")

const logOut = ()=>{
  localStorage.clear();
  navigate('/login')
}

// jwt.verify(localStorage.getItem("token"), 'shhhhh', function(err, decoded) {
//   if (err) {
//     logOut()
//     console.log("token expired",err)
//   }
// });


  return (
    <div className="border-b">
      <div className="container-fluid">
        <div className="header-box">
          <div className="header-c1">
            <div className="logo">
              <a href="/"><img src={logo}></img></a>
            </div>
          </div>

          <div className="header-c2">
            <ul className="menu-list-d">
              <li><div className="login-butn">
              <Link to="/login" onClick={logOut}>Logout</Link>
              </div></li>

            </ul>
            <div className="burger-area">
              <a href="#" className="burgers toggle-slide-right"> <img src={burger} /></a>
            </div>
          </div>

        </div>

        <div className="menu slide-menu-right menu-list-wrp">
          <button class="close-menu"><img src={crosss} className="img-close" /></button>
          <ul className="menu-list2">
            <li> 
              <Link to="/login" onClick={logOut}>Logout</Link>
            </li>
            <li><Link to='/'>Slider Listing</Link>
							</li>
          </ul>
        </div>

      </div>
    </div>
  );

}


export default Header;

