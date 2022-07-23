import {dateFormat, fernhietToCelcuis} from '../services/utils.service';
import React from 'react';

const ForecastCard = ({forecast, units}) => {
	if (!forecast) {
		return <div></div>
	}
	const {Date, Temperature, Day, Night} = forecast
	const date = dateFormat (Date)
	const DayIcon = String (Day.Icon).length >= 2 ? Day.Icon : '0' + Day.Icon
	const NightIcon = String (Night.Icon).length >= 2 ? Night.Icon : '0' + Night.Icon
	const minTemp = units === 'F' ? Temperature.Minimum.Value : fernhietToCelcuis (Temperature.Minimum.Value)
	const maxTemp = units === 'F' ? Temperature.Maximum.Value : fernhietToCelcuis (Temperature.Maximum.Value)

	return <div key={Date} className={'card flex column  align-center justify-center '}>
		<h2> {date}</h2>
		<h3>{minTemp}-{maxTemp} {units}°</h3>
		<h6>Day</h6>
		<h3>{Day.IconPhrase}</h3>
		<img src={`https://developer.accuweather.com/sites/default/files/${DayIcon}-s.png`}/>
		<h6>Night</h6>
		<h3>{Night.IconPhrase}</h3>
		<img src={`https://developer.accuweather.com/sites/default/files/${NightIcon}-s.png`}/>
	</div>
}


export default ForecastCard
