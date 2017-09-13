import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import ShowCards from './ShowCards';
import Introduction from './Introduction';
import Particles from 'react-particles-js';
import classNames from 'classnames';

class MainPage extends React.Component {

	render() {
		return(
			<div className="mainpage__container">
					<div className={`introduction__container ${this.props.searchBarStatus}`}>
						<Introduction />
						<SearchBar 
						handleChange= {this.props.handleChange}
						searchShows= {this.props.searchShows}
						searchBox = {this.props.searchBox}
						/>
					</div>
				<ShowCards
				searchedShowsList= {this.props.searchedShowsList}
				addToCollection= {this.props.addToCollection}
				removeFromCollection={this.props.removeFromCollection}
				user = {this.props.user}
				 />
				
			<Particles height="1080px" width="1920px" params={{
  "particles": {
    "number": {
      "value": 12,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 6
      }
    },
    "opacity": {
      "value": 0.2,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 7.891476416322726,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 15,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 225,
      "color": "#CFD8DC",
      "opacity": 1,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}} />
			</div>
			)
	}
}

export default MainPage;