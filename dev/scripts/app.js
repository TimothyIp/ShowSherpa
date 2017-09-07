import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router, 
    Route, Link, NavLink } from 'react-router-dom';
import { ajax } from 'jquery';
import Navigation from './components/Navigation';
import Catalogue from './components/Catalogue';
import SearchBar from './components/SearchBar';
import UserSearchedShows from './components/UserSearchedShows'


class App extends React.Component {
	// constructor(){
	// 	super();
		
	// }

    render() {
        return (
            <div>
              <h1>All set and ready.</h1>
              <Navigation />
              <SearchBar />
              <UserSearchedShows />
              <Catalogue />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));