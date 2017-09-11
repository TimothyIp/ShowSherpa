import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, Link, NavLink } from 'react-router-dom';

class Header extends React.Component {
	render() {
		return(
			<div>
				<Link to="/"><h2>ShowSherpa</h2></Link>
				{this.props.user ?
				   <div>
				     <div className='user-profile'>
				       <img src={this.props.user.photoURL} />
				       <h3>{this.props.user.displayName}</h3>
				     </div>
				   </div>
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
				<div>Tiny Search goes here</div>
			</div>
			)
	}
}

export default Header;