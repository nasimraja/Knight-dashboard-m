import React, { Component } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
 
import $ from "jquery";
import Header from '../../pages/header.js';
 
 
import Dashboard from './component/Dashboard.js';
 




class Home extends Component {


	render() {
		return (
			<div>
				<div className='home-main-db-wrap'>
					
					<Dashboard />
				</div>
			</div>
		);
	}

}
export default Home;