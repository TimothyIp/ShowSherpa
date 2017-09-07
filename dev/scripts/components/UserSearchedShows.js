import React from 'react';
import SearchBar from './SearchBar';
import ShowCards from './ShowCards';

class UserSearchedShows extends React.Component {
	render(){
		return (
			<div>
				Here are searched shows.
				<SearchBar handleChange={this.props.handleChange} searchShows={this.props.searchShows} />
				<ShowCards showsList = {this.props.searchedShowsList} />
			</div>
			)
	}
}

export default UserSearchedShows;