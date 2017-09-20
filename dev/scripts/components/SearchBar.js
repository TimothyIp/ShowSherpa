import React from 'react';

class SearchBar extends React.Component {
	render(){
		return (
				<form className="searchbar__form" onSubmit={this.props.searchShows} autoComplete="off">
					<input onChange={this.props.handleChange} name="searchedShows" type="text" placeholder="Find TV Shows" 
						autoComplete="off"
					/>
				</form>
			)
	}
}

export default SearchBar;