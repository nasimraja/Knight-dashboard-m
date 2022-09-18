import React from "react";
 
import Rightsidebar from "./Rightsidebar";
import Leftsidebar from "./Leftsidebar";
import Header from "../../header";




class Dashboard extends React.Component {
	render() {
		return (
			<div>
				 
				<Header />
				<div className='home-db-wrap'>
					<div className="leftsidebar">
						<Leftsidebar />
					</div>
					<div className="right-sidebar">
						<Rightsidebar />
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard;