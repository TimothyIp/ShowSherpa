import React from 'react';

class SearchBar extends React.Component {

	render(){
		return (
				<form className="searchbar__form"onSubmit={this.props.searchShows}>
					<input onChange={this.props.handleChange} name="searchedShows" type="text" placeholder="Search Tv Shows..." />
				</form>
			)
	}
}

export default SearchBar;