import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, Link, NavLink } from 'react-router-dom';

class Header extends React.Component {
	render() {
		return(
			<div className="header">
				<Link to="/"><h2>ShowSherpa</h2></Link>
				{this.props.user ?
				   null
				   :
				   <div className='wrapper'>
				     <p>You must be logged in to save your collections.</p>
				   </div>
				 }
				{this.props.user ?
				    <button onClick={this.props.logout}>Log Out</button>
				    :
				    <button onClick={this.props.login}>Log In</button>
				  }
			</div>
			)
	}
}

export default Header;