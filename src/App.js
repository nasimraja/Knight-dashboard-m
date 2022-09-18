import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/home/home.js';
import Login from './components/pages/Login/Login';
import Sliderlists from './components/pages/slider/Sliderlists';
import Privateroute from './components/pages/Privateroute';





class App extends Component {

	render() {
		return (
			<Router>
				<div>
					<Routes>
					<Route path="" element={<Privateroute />}>
					<Route path="/" element={<Home />} />
					<Route path="/slider/:id" element={<Sliderlists />} />
					</Route>
					<Route path="/login"  element={<Login />} />
					</Routes>
				</div>
			</Router>
		);
	}
}

export default App;
