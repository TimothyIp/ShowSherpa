import React from 'react';
import ShowCards from './ShowCards';
class UserCatalogue extends React.Component {


	render(){
		return (
			<div className="usercatalogue__container">
				<h1>Your Collection</h1>
				<ShowCards 
				user = {this.props.user}
				userCollection={this.props.userCollection}
				removeFromCollection={this.props.removeFromCollection}
				/>
			</div>
			)
	}
}

export default UserCatalogue;