import React from 'react';


class Header extends React.Component {
	render() {
		return(
			<div>
				<h2>ShowSherpa</h2>
				{this.props.user ?
				   <div>
				     <div className='user-profile'>
				       <img src={this.props.user.photoURL} />
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