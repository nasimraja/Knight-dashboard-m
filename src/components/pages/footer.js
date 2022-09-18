import React, { Component } from 'react';
import social1  from '../images/social1.png';
import social5  from '../images/social5.png';
import logo from '../images/logo.png';
import sign from '../images/sign.png';

class Footer extends Component {
  render() {
	 return (
		 <div>
			 <div className="footer-bg">
			 <div className="container-fluid">	
				<div className="row">
					<div className="col-lg-4">
						<div className='f-left'>
							<img src={logo}></img>
							<p><strong>Your Tagline Here</strong></p>
							<p>There are many variations of passages of
                               Lorem Ipsum available, but the majority have
                               suffered alteration in some form,</p>
						</div> 
					</div>
					<div className='col-lg-1'></div>
					<div className="col-lg-3">
						 <div className='f-center'>
							 <div className='f-center-h'><h3>Information</h3></div>
							 <ul className='f-list'>
								 <li><a href='#seo'>Home</a></li>
								 <li><a href='#sem'>About Us</a></li>
								 <li><a href='#social-media'>Services</a></li>
								 <li><a href='#instagram-promotions'>Contact us</a></li>
							 </ul>
						 </div>
					</div>
					
					<div className="col-lg-4">
						<div className='f-right'>
							<div className='f-right-h'>
								<h3>Stay connected</h3>
								<p>Lorem ipsum dolor sit amet, consectetur
                                   adipiscing elit, sed do eiusmod tempor incididunt
                                   ut labore et dolore magna aliqua.</p>
							</div>
							<div className='sing-up'>
								<div className='sign-up-input'>
									<input text='text'placeholder='Email Address'></input>
								</div>
								<div className='sign-up-but'>
									<a href='#'>
										Sign-up
										<img src={sign}></img>
									</a>
								</div>
							</div>

							<div className='social-icon'>
								<ul className='icon'>
									<li>
										<a href='#'><i class="fab fa-facebook-f"></i></a>
									</li>
									<li>
										<a href='#'><i class="fab fa-twitter"></i></a>
									</li>
									<li>
										<a href='#'><i class="fab fa-instagram"></i></a>
									</li>
									<li>
										<a href='#'><i class="fab fa-telegram-plane"></i></a>
									</li>
									<li>
										<a href='#'> <i class="fab fa-linkedin-in"></i></a>
									</li>
								</ul>
							</div>
							 
						</div> 
					</div>
				</div>

               <div className='footer-line'></div>	
			   <div className='copyright'>
				   <p>© 2022 all rights reserved</p>
				   <a href='#'><i class="fas fa-chevron-up"></i></a>
			   </div>

			 </div>
		 </div>
		 </div>

    );
  }
}

export default Footer;