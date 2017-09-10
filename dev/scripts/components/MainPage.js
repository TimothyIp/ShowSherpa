import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import ShowCards from './ShowCards';

class MainPage extends React.Component {

	render() {
		return(
			<div>
				<SearchBar 
				handleChange= {this.props.handleChange}
				searchShows= {this.props.searchShows}
				/>
				<ShowCards
				searchedShowsList= {this.props.searchedShowsList}
				addToCollection= {this.props.addToCollection}
				removeFromCollection={this.props.removeFromCollection}
				 />
			</div>
			)
	}
}

export default MainPage;