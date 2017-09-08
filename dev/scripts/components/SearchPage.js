import React from 'react';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import ShowCards from './ShowCards';

class SearchPage extends React.Component {
	render() {
		return(
			<div>
				<SearchBar />
				<ShowCards/>
			</div>
			)
	}
}

export default SearchPage;