import {dateFormat} from '../services/utils.service';
import React from 'react';
import ForecastCard from './ForcastCard';

const WeatherList=({forecast,units})=>{
	if (!forecast){
		return <div></div>
	}
	return 		<div  className={'card-grid'}>
			{forecast?.DailyForecasts ?
				forecast.DailyForecasts.map ((results)=> {
				return <ForecastCard key={results.Date} forecast={results} units={units}/>
				}):""}
		</div>




}
export default WeatherList
