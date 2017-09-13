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
import UserCalendar from './components/UserCalendar';
import moment from 'moment';
import firebase, { auth, provider } from './firebase';
var classNames = require('classnames');

const dbRef = firebase.database().ref('/usersInfo')


class App extends React.Component {
  	constructor(){
  		super();
  		this.handleChange = this.handleChange.bind(this);
      this.searchShows = this.searchShows.bind(this);
      this.addToCollection = this.addToCollection.bind(this);
      this.removeFromCollection = this.removeFromCollection.bind(this);
      this.getUserShowTimes = this.getUserShowTimes.bind(this);
      this.addToCalendar = this.addToCalendar.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.eventTriggered = this.eventTriggered.bind(this);
      this.navBarToggle = this.navBarToggle.bind(this);
      this.state = {
        user: null,
        searchedShowsList : [],
        userCollection: [],
        userShowTimes: [],
        futureEpisodes: [],
        events: [],
        eventCount: 0,
        searchBarStatus: false,
        searchHeaderStatus: false,
        searchBox: "",
        navBar: "",
        navBarSlide: "fadeOutLeft",
        mainContentSlide: "full__width",
        snackBarSlide: {},
      };
    }

    login() {
      auth.signInWithPopup(provider) 
         .then((result) => {
          // console.log(result)
           const user = result.user;
           this.setState({
             user: user,
             userCollection: [],
           }, () => {
            this.fireBaseSync()
           });
         });
    }

    logout() {
      auth.signOut()
         .then(() => {
           this.setState({
             user: null,
             searchedShowsList : [],
             userCollection: [],
             userShowTimes: [],
             futureEpisodes: [],
             events: [],
             eventCount: 0,
           });
         });
    }

    eventTriggered(event) {
      return classNames({
        intro__slideUp: event === true,
        header__searchOn: event === "shA",
      });
    }



    navBarToggle() {

      if (this.state.navBar !== "menu__lineAnimate"){
      this.setState({
        navBar : "menu__lineAnimate",
        navBarSlide: "",
        mainContentSlide: "",
      })
    } else if (this.state.navBar === "menu__lineAnimate") {
        this.setState({
          navBar: "",
          navBarSlide: "fadeOutLeft",
          mainContentSlide: "full__width",
        })
      }
  
    }

    snackBarFade(){
        setTimeout(() => {
            this.setState({
            snackBarSlide: {},
          })
        }, 2750);
    }

    snackBar(text) {
        this.setState({
          snackBarSlide: {
            text: text,
            slide: "snackBarSlide",
          }
        })
        this.snackBarFade();
    }

    addToCollection(show) {
      const showsPickedList = Array.from(this.state.userCollection);
      if(this.state.user){
        console.log(showsPickedList)
        const dbRef = firebase.database().ref(`usersInfo/${this.state.user.uid}`)
        
       let dupDetect = showsPickedList.filter(function(showsPicked) {
          return showsPicked.id === show.id
        })

        if (dupDetect.length === 0) {
          dbRef.push(show);
        }

        this.snackBar("Added to Collection");

        this.setState(() => {
          this.fireBaseSync();
        }, () => {
          this.getUserShowTimes();
        })
      }


      showsPickedList.push(show);
      //remove duplicate tv shows
      let showsPicked = showsPickedList.filter( function( item, index, self) {
        return index == self.indexOf(item);
      })

      this.setState({
        userCollection: showsPicked
      })
    }

    removeFromCollection(index, firebaseId) {
      console.log(firebaseId)
      const showRemoved = Array.from(this.state.userCollection);
      if(this.state.user) {
        const userId = this.state.user.uid;
        const itemRef = firebase.database().ref(`usersInfo/${userId}/${firebaseId}`);
        itemRef.remove();
      }
      showRemoved.splice(index,1);
      this.setState({
        userCollection: showRemoved
      }, () => {
        this.getUserShowTimes();
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

       let searchbarAnimate = this.eventTriggered(true);

       let searchHeaderAnimate = this.eventTriggered("shA")

       this.setState({
        searchBarStatus: searchbarAnimate,
        searchHeaderStatus: searchHeaderAnimate,
       })

      ajax({
        url:`https://api.tvmaze.com/search/shows`,
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

    getUserShowTimes() {
      const showTimesArray = Array.from(this.state.userCollection);
      const showTimesInfo = [];
      const todaysDate = moment().format("llll");

      for (let i = 0; i < showTimesArray.length; i++) {
        ajax({
          url: `https://api.tvmaze.com/shows/${showTimesArray[i].id}/episodes`,
          method: "GET",
          dataType: "json"
        }).then((res) => {
          //Gets only future episodes from todays date
          let futureEpisodeTime = res.filter((episode) => {
            // console.log(moment(episode.airstamp).diff(moment()))
            return moment(episode.airstamp).diff(moment()) > 0
          })
          //Only puts shows with future episodes into calendar
          if (futureEpisodeTime.length > 0) {
            showTimesInfo.push({
            id: showTimesArray[i].id,
            name: showTimesArray[i].name,
            status: showTimesArray[i].status,
            futureEpisodes: futureEpisodeTime
            })
          }
             this.setState({
        futureEpisodes: showTimesInfo
      },() => {
        this.addToCalendar();
      })
        })
      }
    }

    addToCalendar() {
      let eventList = [];
      let eventArray = Array.from(this.state.futureEpisodes);
      let eventCounter = 0;

      this.eventTriggered("added")
      for (let i = 0; i < eventArray.length; i++) {
        for (let j = 0; j < eventArray[i].futureEpisodes.length; j++) {
          eventList.push({
            title: eventArray[i].name,
            start: moment(eventArray[i].futureEpisodes[j].airstamp).toDate(),
            end: moment(eventArray[i].futureEpisodes[j].airstamp).add(eventArray[i].futureEpisodes[j].runtime, "m").toDate(),
            desc: eventArray[i].futureEpisodes[j].name,
          })
          eventCounter++
        }
      }
        this.setState({
          events: eventList,
          eventCount: eventCounter
        })
       }

    fireBaseSync() {
       dbRef.on('value', (snapshot) => {
        let shows = snapshot.val();
        let firebaseUserCollection = [];
        let userId = this.state.user.uid;

        for (let show in shows[`${userId}`]) {
          firebaseUserCollection.push({
            fbaseId: show,
            genres: shows[`${userId}`][show].genres,
            id: shows[`${userId}`][show].id,
            image: {"medium": shows[`${userId}`][show].image.medium },
            name: shows[`${userId}`][show].name,
            runtime: shows[`${userId}`][show].runtime,
            summary: shows[`${userId}`][show].summary,
          })
        }       
        //remove duplicates from array
        function trim(arr, key) {
            var values = {};
            return arr.filter(function(item){
                var val = item[key];
                var exists = values[val];
                values[val] = true;
                return !exists;
            });
        }

       this.setState({
        userCollection: trim(firebaseUserCollection, 'id')
       }, () => {
       })
       this.getUserShowTimes();
       this.addToCalendar();
      })
    }

    componentDidMount() {
      auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ 
              user:user,
              userCollection: [],
            },() => {
            this.fireBaseSync();
            });
          } 
        });
    }

    render() {
        return (
          <Router>
              <div className="app">
                <div className={`aside__content ${this.state.navBarSlide}`}>
                  <Navigation 
                  user = {this.state.user}
                  eventCount = {this.state.eventCount}
                  userCollection = {this.state.userCollection}
                  login = {this.login}
                  logout = {this.logout}
                   />

                </div>
                <div className={`main__content ${this.state.mainContentSlide}`}>
                  <Header 
                  user = {this.state.user}
                  login = {this.login}
                  logout = {this.logout}
                  handleChange={this.handleChange}
                  searchShows={this.searchShows}
                  searchHeaderStatus = {this.state.searchHeaderStatus}
                  mainContentSlide={this.state.mainContentSlide}
                  eventTriggered = {this.state.eventTriggered}
                  navBarToggle = {this.navBarToggle}
                  navBar = {this.state.navBar}
                  />
                <Route exact 
                  path="/"
                  render={(props) => (
                    <MainPage 
                    handleChange={this.handleChange}
                    searchShows={this.searchShows}
                    searchedShowsList={this.state.searchedShowsList}
                    addToCollection={this.addToCollection}
                    removeFromCollection={this.removeFromCollection}
                    user = {this.state.user}
                    searchBarStatus = {this.state.searchBarStatus}
                    searchBox = {this.state.searchBox}
                    />
                  )}
                  />
                  <Route exact 
                  path="/usershows" 
                  render={(props) => (
                    <UserCatalogue
                    user = {this.state.user}
                    userCollection={this.state.userCollection}
                    removeFromCollection={this.removeFromCollection}
                    />
                    )}
                  />
                  <Route exact 
                  path="/user-showtimes"
                  render= {(props) => (
                    <UserCalendar 
                    userCollection = {this.state.userCollection}
                    futureEpisodes = {this.state.futureEpisodes}
                    getUserShowTimes = {this.getUserShowTimes}
                    addToCalendar = {this.addToCalendar}
                    events = {this.state.events}
                    />
                    )}
                  />
                    <div className={`snackbar ${this.state.snackBarSlide.slide}`}>
                      <p>{this.state.snackBarSlide.text}</p>
                    </div>
                  </div>
              </div>
            </Router>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
