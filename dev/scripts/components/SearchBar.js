import React from 'react';
import { ajax } from 'jquery';

class SearchBar extends React.Component {
	constructor(){
		super();
		this.state = {
			searchedShows : []
		}
	}

	searchShows(e) {
		e.preventDefault();
		const showName = this.name.value
		
		ajax({
			url:`http://api.tvmaze.com/search/shows`,
			method: "GET",
			dataType: "json",
			data: {
				q: showName
			}
		}).then((res)=> {
			this.setState({
				searchedShows : res
			})
			console.log(res);
			// this.prop.renderShows(res)
		})

	}

	render(){
		return (
				<form onSubmit={this.searchShows.bind(this)}>
					<input ref={(input) => this.name = input} type="text" placeholder="Search Tv Shows..." />
				</form>
			)
	}
}

export default SearchBar;