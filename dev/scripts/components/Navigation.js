import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserCatalogue from './UserCatalogue';

class Navigation extends React.Component {
	render(){
		return (
                <div>
                    <h1>Navigation</h1>
                    <Link to="/">Search</Link>
                    <Link to="/usershows">My TV Shows</Link>
                    <Link to="/user-showtimes">My Show Times</Link>
                </div>

			)
	}
}

export default Navigation;
 