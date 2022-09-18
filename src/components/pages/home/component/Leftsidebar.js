import React from "react";
import { Link } from "react-router-dom";


class Leftsidebar extends React.Component {
	render() {
		return (
			<div>
				<div className='left-list'>
					<div className="list-wrp">
						<ul className='left-sideb-list'>
							<li><Link to='/'>
							<i class="fa-solid fa-list"></i>
								<span>Slider Listing</span></Link>
							</li>
							 
							 
							 
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default Leftsidebar;