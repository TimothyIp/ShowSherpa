import React from 'react';
import Calendar from './Calendar';


class UserCalendar extends React.Component {

	render() {
		return(
			<div>
				<div>This is user calendar</div>
				<Calendar 
                getUserShowTimes = {this.props.getUserShowTimes}
                futureEpisodes = {this.props.futureEpisodes}
                getUserShowTimes = {this.props.getUserShowTimes}
                addToCalendar = {this.props.addToCalendar}
                events = {this.props.events}
				/>
			</div>
			)
	}
}

export default UserCalendar;