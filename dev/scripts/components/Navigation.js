import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserCatalogue from './UserCatalogue';

class Navigation extends React.Component {
	render(){
		return (
			<Router>
                <div>
                    <h1>Navigation</h1>
                    <Link to="/">TV Show Search</Link>
                    <Link to="/usershows">My TV Shows</Link>
                    <Link to="/showtimes">My Show Times</Link>
                    <Route exact path="/usershows" component={UserCatalogue} />
            
                </div>
       		 </Router>
			)
	}
}

export default Navigation;
 