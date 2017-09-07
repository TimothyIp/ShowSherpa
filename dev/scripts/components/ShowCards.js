import React from 'react';

class ShowCards extends React.Component {

	componentDidMount() {
		console.log("showcards test", this.props.showsList)
	}

	render(){
		return (
				<div className="wrapper">
					<ul>
						<li>ShowCards here..</li>
						{this.props.showsList.map((show) => {
							return (

								<li>
									<img src={show.show.image.medium} alt={show.show.name}/>
									<h2>{show.show.name}</h2>
								</li>

								)
						})}
					</ul>
				</div>
			)
	}
}

export default ShowCards;