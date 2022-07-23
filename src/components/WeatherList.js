import React from 'react';
import ForecastCard from './ForcastCard';

const WeatherList=({forecast,units})=>{
	if (forecast?.length>0) {

		return <div className={'card-grid'}>
			{forecast?
				forecast.map ((results) => {
					return <ForecastCard key={results?.Date} forecast={results} units={units}/>
				}) : ""}
		</div>

	}
	else {
		return ''
	}


}
export default WeatherList
