import React from 'react';


class ShowCards extends React.Component {

	componentDidMount() {
		console.log("showcards mount", this.props.user)
	}


	render(){
		return (
			<div className="showcards__wrapper">
				
					{this.props.searchedShowsList && 
						<ul>
							{this.props.searchedShowsList.map((show,index) => {
									return (
										<li key={`showId-${index}`}>
											<div className="showcards__container">
												<img src={show.show.image.medium} alt={show.show.name}/>
												<h2>{show.show.name}</h2>
												<button onClick={() => {
													this.props.addToCollection(show.show)
												}}>Add to Collection</button>
											</div>
										</li>
									)
								})}
						</ul>}
					{this.props.userCollection && 
						<ul>
							{this.props.userCollection.map((show,index) => {
									return (
										<li key={`showId-${index}`}>
											<div className="showcards__container">
												<img src={show.image.medium} alt={show.name}/>
												<h2>{show.name}</h2>
												<button onClick={() => {
													console.log(show)
													this.props.removeFromCollection(index,show.fbaseId)
												}}>Remove from Collection</button>
											</div>
										</li>
									)
								})}
						</ul>}
				
			</div>
			)
	}
}

export default ShowCards;
