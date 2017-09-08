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
import Header from './components/Header';
import MainPage from './components/MainPage';

class App extends React.Component {
  	constructor(){
  		super();
  		this.handleChange = this.handleChange.bind(this);
      this.searchShows = this.searchShows.bind(this);
      this.addToCollection = this.addToCollection.bind(this);
      this.removeFromCollection= this.removeFromCollection.bind(this);
      this.state = {
        searchedShowsList : [],
        userCollection: []
      };
    }

    addToCollection(show) {
      const showsPickedList = Array.from(this.state.userCollection);
      showsPickedList.push(show);
  
       //remove duplicate tv shows
      let showsPicked = showsPickedList.filter( function( item, index, self) {
        return index == self.indexOf(item);
      })

      console.log(showsPicked)
      this.setState({
        userCollection: showsPicked
      })

    }

    removeFromCollection(show) {
      const showRemoved = Array.from(this.state.userCollection);
      console.log(show)
      showRemoved.splice(show,1);
      console.log(showRemoved);
      this.setState({
        userCollection: showRemoved
      })
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
        console.log(this.state.searchedShowsList)
      })

    }
    render() {
        return (
          <Router>
              <div>
                <Header />
                <Navigation />
                <h1>All set and ready.</h1>
            
                <Route exact 
                path="/"
                render={(props) => (
                  <MainPage 
                  handleChange={this.handleChange}
                  searchShows={this.searchShows}
                  searchedShowsList={this.state.searchedShowsList}
                  addToCollection={this.addToCollection}
                  removeFromCollection={this.removeFromCollection}
                  />
                )}
                />
                <Route exact path="/usershows" component={UserCatalogue} />
            
              </div>
            </Router>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));

 // <SearchBar 
 //                handleChange={this.handleChange} 
 //                searchShows={this.searchShows} 
 //                />
 //                <UserSearchedShows 
 //                handleChange={this.handleChange} 
 //                searchShows={this.searchShows} 
 //                searchedShowsList = {this.state.searchedShowsList}
 //                addToCollection = {this.addToCollection}
 //                />

    // <MainPage 
    //             handleChange={this.handleChange}
    //             searchShows={this.searchShows}
    //             searchedShowsList={this.state.searchedShowsList}
    //             addToCollection={this.addToCollection}
    //             />