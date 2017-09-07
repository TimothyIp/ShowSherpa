import React from 'react';
import SearchBar from './SearchBar';

class UserSearchedShows extends React.Component {
	constructor(){
		super();
		this.renderShows = this.renderShows.bind(this);
		this.state = {
			pickedShows: []
		}
	}

	renderShows(showsList) {

	}


	render(){
		return (
			<div>
				Here are searched shows.
				<SearchBar />
			</div>
			)
	}
}

export default UserSearchedShows;