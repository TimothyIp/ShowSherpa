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
                                    <p>{`You have ${this.props.eventCount} upcoming shows`}</p>
                                  </div>
                                  :
                                  <div className='wrapper'>
                                    <p>Welcome, Guest!</p>
                                    <p>You must be logged in to see your shows</p>
                                  </div>
                                    }
                   <Link to="/">Search</Link>
                   <Link to="/usershows">My TV Shows  <span className="notification">{this.props.userCollection.length}</span></Link>
                   <Link to="/user-showtimes">My Show Times <span className="notification">{this.props.eventCount}</span></Link>
               </div>
               <div className="nav__buttons">
                 {this.props.user ?
                    null
                    :
                    <div className='user__warning'>
                      <p>You must be logged in to save your collections.</p>
                    </div>
                  }
                 {this.props.user ?
                     <button onClick={this.props.logout}>Log Out</button>
                     :
                     <button onClick={this.props.login}>Log In</button>
                   }
               </div>
               <div className="footer">
                  Powered by TVmaze API <br/> Made with React <br/> By Timothy Ip
               </div>
             </nav>

			)
	}
}

export default Navigation;
  // <img src={this.props.user.photoURL} />
  //                      <h3>{this.props.user.displayName}</h3>