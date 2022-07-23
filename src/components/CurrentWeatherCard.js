import React from 'react';

const CurrentWeatherCard = ({currentWeather,units}) => {
	const number = currentWeather?.WeatherIcon < 10 ? '0' + currentWeather.WeatherIcon : currentWeather.WeatherIcon

	if (!currentWeather) {
		return <div></div>
	}
	return <div>
		{units==='C'?<div>{currentWeather?.Temperature?.Metric?.Value} {currentWeather?.Temperature?.Metric?.Unit}</div>
		:	<div>{currentWeather?.Temperature?.Imperial?.Value} {currentWeather?.Temperature?.Imperial?.Unit}</div>}
		<img alt={'current weather'}
		     src={`https://developer.accuweather.com/sites/default/files/${number}-s.png`}/>
		<span>{currentWeather.WeatherText}</span>
	</div>
}
export default CurrentWeatherCard
