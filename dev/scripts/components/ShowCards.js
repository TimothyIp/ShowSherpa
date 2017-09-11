import React from 'react';

class ShowCards extends React.Component {

	componentDidMount() {
		console.log("showcards mount", this.props.user)
	}


	render(){
		return (
			<div className="wrapper">
				<ul>
					<li>ShowCards here..</li>
					{this.props.searchedShowsList && 
						<div>
							{this.props.searchedShowsList.map((show,index) => {
									return (
										<li key={`showId-${index}`}>
											<div>
												<img src={show.show.image.medium} alt={show.show.name}/>
												<p>{show.show.status}</p>
												<h2>{show.show.name}</h2>
												<button onClick={() => {
													this.props.addToCollection(show.show)
												}}>Add to Collection</button>
											</div>
										</li>
									)
								})}
						</div>}
					{this.props.userCollection && 
						<div>
							{this.props.userCollection.map((show,index) => {
									return (
										<li key={`showId-${index}`}>
											<div>
												<img src={show.image.medium} alt={show.name}/>
												<p>{show.status}</p>
												<h2>{show.name}</h2>
												<button onClick={() => {
													console.log(show)
													this.props.removeFromCollection(index,show.fbaseId)
												}}>Remove from Collection</button>
											</div>
										</li>
									)
								})}
						</div>}
					<div>no searched list</div>
				</ul>
			</div>
			)
	}
}

export default ShowCards;

		// {this.props.searchedShowsList.map((show,index) => {
		// 				return (
		// 					<li key={`showId-${index}`}>
		// 						<div>
		// 							<img src={show.show.image.medium} alt={show.show.name}/>
		// 							<h2>{show.show.name}</h2>
		// 							<p>{show.show.genres[0]}</p>
		// 							<button onClick={() => {
		// 								this.props.addToCollection(show.show)
		// 							}}>Add to Collection</button>
		// 							<button onClick={() => {
		// 								this.props.removeFromCollection(show.show)
		// 							}}>Remove from Collection</button>
		// 						</div>
		// 					</li>
		// 				)
		// 			})}