import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';



BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.views).map( k => BigCalendar.views[k])


class Calendar extends React.Component {

	componentDidMount(){
	this.props.getUserShowTimes();
	this.props.addToCalendar();
	}

	render() {
		return(
			<div className="calendar__container">
				<div>Calendar goes here</div>
				<BigCalendar 
				// {...this.props}
				events = {this.props.events}
				views = {this.allViews}
				defaultDate={new Date(moment())}
				/>
			</div>
			)
	}
}

export default Calendar;