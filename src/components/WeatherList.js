import {dateFormat} from '../services/utils.service';
import React from 'react';

const WeatherList=({forecast})=>{
	if (!forecast){
		return <div></div>
	}
	return <div className={'eventiList-container'}>
		<div className={'EventiList'}>
			{forecast?.DailyForecasts ?
				forecast.DailyForecasts.map (({Date, Temperature, Day, Night}) => {
					                             const date = dateFormat (Date)
					                             const DayIcon = String (Day.Icon).length >= 2 ? Day.Icon : '0' + Day.Icon
					                             const NightIcon = String (Night.Icon).length >= 2 ? Night.Icon : '0' + Night.Icon
					                             return <div key={Date} className={'card flex column'}>
						                             <h3> {date}</h3>
						                             <h4>Temp</h4>
						                             {Temperature.Minimum.Value}-{Temperature.Maximum.Value}
						                             <h4>Unit</h4>
						                             {Temperature.Maximum.Unit}
						                             <div>
							                             <h6>Day</h6>
							                             <span>{Day.IconPhrase}</span>
							                             <img src={`https://developer.accuweather.com/sites/default/files/${DayIcon}-s.png`}/>
							                             <h6>Night</h6>
							                             <span>{Night.IconPhrase}</span>
							                             <img src={`https://developer.accuweather.com/sites/default/files/${NightIcon}-s.png`}/>
						                             </div>
					                             </div>
				                             }
				) : ''
			}
		</div>
	</div>



}
export default WeatherList
