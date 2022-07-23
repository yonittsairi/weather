import {dateFormat,fernhietToCelcuis} from '../services/utils.service';
import React from 'react';

const ForecastCard = ({forecast,units}) => {
	const {Date, Temperature, Day, Night} = forecast
	const date = dateFormat (Date)
	const DayIcon = String (Day.Icon).length >= 2 ? Day.Icon : '0' + Day.Icon
	const NightIcon = String (Night.Icon).length >= 2 ? Night.Icon : '0' + Night.Icon
	const minTemp=units==='F'? Temperature.Minimum.Value:fernhietToCelcuis(Temperature.Minimum.Value)
		const maxTemp=units==='F'?Temperature.Maximum.Value:fernhietToCelcuis(Temperature.Maximum.Value)
	if (!forecast) {
		return <div></div>
	}

	return <div key={Date} className={'card flex column  align-center'}>
		<div className={'card-grid'}>
		<h3> {date}</h3>
		<h4>Temp</h4>
		{minTemp}-{maxTemp}
		<h4>Unit</h4>
		{units}
		<div>
			<h6>Day</h6>
			<span>{Day.IconPhrase}</span>
			<img src={`https://developer.accuweather.com/sites/default/files/${DayIcon}-s.png`}/>
			<h6>Night</h6>
			<span>{Night.IconPhrase}</span>
			<img src={`https://developer.accuweather.com/sites/default/files/${NightIcon}-s.png`}/>
		</div></div>
	</div>
}


export default ForecastCard
