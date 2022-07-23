import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {actions} from '../store/Reducers';


const CurrentWeatherCard = (props) => {
	const {currentWeather,chosenCity,name}=props
	const {units,favorites} = useSelector ((state) => state.appstate);
	const number = currentWeather?.WeatherIcon < 10 ? '0' + currentWeather.WeatherIcon : currentWeather.WeatherIcon
	const favorite= favorites.find((f)=>f.name ===chosenCity?.LocalizedName||name)
	const dispatch= useDispatch()
	const addOrRemoveFromFav=()=>{
			if(!favorite){
				dispatch(actions.addFavorite({id:chosenCity.Key, name:chosenCity?.LocalizedName,currentWeather}))

			}else {
				dispatch (actions.removeFavorite ({name: favorite.name}))
			}
	}
	if (!currentWeather.Temperature) {
		return <div className={'card current flex column align-center justify-center'}>
			<h3>Something went wrong please see message below</h3>
			<div><SentimentVeryDissatisfiedIcon/></div>

		</div>
	}
	return <div className={'card current flex column align-center'}>
		{name?<h4>Weather in {name}</h4>:<h4>Weather in {chosenCity?.LocalizedName}</h4>}
		{favorite? <FavoriteIcon onClick={()=>addOrRemoveFromFav()} /> :<FavoriteBorderIcon onClick={()=>addOrRemoveFromFav()}/>}
		{units==='C'?<div>{currentWeather?.Temperature?.Metric?.Value} {currentWeather?.Temperature?.Metric?.Unit}°</div>
		:	<div>{currentWeather?.Temperature?.Imperial?.Value} {currentWeather?.Temperature?.Imperial?.Unit}°</div>}
		<img alt={'current weather'}
		     src={`https://developer.accuweather.com/sites/default/files/${number}-s.png`}/>
		<span>{currentWeather.WeatherText}</span>
	</div>
}
export default CurrentWeatherCard
