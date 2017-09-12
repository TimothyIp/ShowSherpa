import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import UserCatalogue from './UserCatalogue';

class Navigation extends React.Component {
	render(){
		return (
             <nav>
                  <div className = "logo">
                    <img src="../public/assets/sherpa_logo.png" alt=""/>
                  </div>
               <div className = "navbar">
                   {this.props.user ?
                                  <div>
                                    <img className="nav__user--image" src={this.props.user.photoURL} />
                                    <h3>Hey, {this.props.user.displayName.split(" ")[0]}</h3>
                                  </div>
                                  :
                                  <div className='wrapper'>
                                    <p>Welcome, Guest!</p>
                                  </div>
                                    }
                   <Link to="/">Search</Link>
                   <Link to="/usershows">My TV Shows</Link>
                   <Link to="/user-showtimes">My Show Times</Link>
               </div>
             </nav>

			)
	}
}

export default Navigation;
  // <img src={this.props.user.photoURL} />
  //                      <h3>{this.props.user.displayName}</h3>