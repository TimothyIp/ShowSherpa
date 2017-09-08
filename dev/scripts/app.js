import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router, 
    Route, Link, NavLink } from 'react-router-dom';
import { ajax } from 'jquery';
import Navigation from './components/Navigation';
import UserCatalogue from './components/UserCatalogue';
import SearchBar from './components/SearchBar';
import UserSearchedShows from './components/UserSearchedShows';

class App extends React.Component {
  	constructor(){
  		super();
  		this.handleChange = this.handleChange.bind(this);
      this.searchShows = this.searchShows.bind(this);
      this.state = {
        searchedShowsList : []
      };
    }

    handleChange(event) {
      this.setState({
        [event.target.name] : event.target.value
      })
    }

    searchShows(e) {
      e.preventDefault();
       const showName = this.state.searchedShows
      
      ajax({
        url:`http://api.tvmaze.com/search/shows`,
        method: "GET",
        dataType: "json",
        data: {
          q: showName
        }
      }).then((res)=> {

        //filter out tv shows with no posters
        let showsWithPoster= [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].show.image) {
            showsWithPoster.push(res[i]);
          }
        }


        this.setState({
          searchedShowsList : showsWithPoster
        })
      })

    }
    render() {
        return (
            <div>
              <h1>All set and ready.</h1>
              <Navigation />
              <SearchBar handleChange={this.handleChange} searchShows={this.searchShows} />
              <UserSearchedShows handleChange={this.handleChange} searchShows={this.searchShows} searchedShowsList = {this.state.searchedShowsList}/>
              <UserCatalogue />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
