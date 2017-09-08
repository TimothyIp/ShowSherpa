import React from 'react';
import SearchBar from './SearchBar';
import ShowCards from './ShowCards';

class UserSearchedShows extends React.Component {
	render(){
		return (
			<div>
				Here are your user searched shows.
				<SearchBar 
				handleChange={this.props.handleChange} 
				searchShows={this.props.searchShows} />
				<ShowCards 
				searchedShowsList = {this.props.searchedShowsList}
				addToCollection = {this.props.addToCollection} 
				/>
			</div>
			)
	}
}

export default UserSearchedShows;