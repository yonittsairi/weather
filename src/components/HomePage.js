import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, Input, FormHelperText, List, ListItem} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
	getCitiesAsync,
	actions,
	getFiveDaysForecastByLocationKey,
	getCurrentWeather,
	getDefaultCity
} from '../store/Reducers';
import {constants} from '../constants';
import WeatherList from './WeatherList';
import CurrentWeatherCard from './CurrentWeatherCard';
import CitiesList from './CitiesList';

const HomePage = () => {
	const [forecast, setForecast] = useState ({DailyForecasts: []})
	const [currentWeather, setCurrentWeather] = useState ({})
	const [isFavorite, setIsFavorite] = useState (false)
	const [showList, setShowList] = useState (false)
	const [value, setValue] = useState ('')
	const [favorites, setFavoriteList] = useState ([])
	const state = useSelector ((state) => state.appstate);
	const dispatch = useDispatch ();
	const chooseCity = (e) => {
		setValue('')
		dispatch (actions.setChosenCity (e))
		dispatch(actions.setCities([]))
		getForecast (e.Key)
	}
	useEffect (() => {
		checkIfIncludedInFavorites (state.defaultCity)
		setFavoriteList (state.favorites)
		if (state?.chosenCity?.Key == constants.telAviv) {
			getForecast (constants.telAviv)
			checkIfIncludedInFavorites (state.chosenCity)
		}
		else {

			dispatch (getDefaultCity (constants.telAviv))
			getForecast (constants.telAviv)
		}

	}, [])

	const checkIfIncludedInFavorites = () => {
		if (favorites?.length > 0) {
			const existsInFav = favorites.find ((f) => f.id == state.chosenCity.Key)
			if (existsInFav) {
				setIsFavorite (true)
			}
			else {
				setIsFavorite (false)
			}
		}
		else {
			setIsFavorite (false)
		}
	}
	const checkValue = (value) => {
		const newVal = value.replace (/[^A-Za-z]/ig, '')
		setValue (newVal)
		return newVal
	}
	const getCities = async (e) => {
		let value = e.target.value
		value = checkValue (value)
		dispatch (getCitiesAsync (value))
		setShowList (true)
	}

	const getForecast = (data) => {
		checkIfIncludedInFavorites (state.chosenCity)
		dispatch (getCurrentWeather (data))
		dispatch (getFiveDaysForecastByLocationKey (data))
		setForecast (state.weather)

		setCurrentWeather (state.currentWeather)
	}

	function changeFavStatus (bool) {
		setIsFavorite (bool)
		const payload = {id: Number(state.chosenCity?.Key), name: state.chosenCity.LocalizedName, currentWeather}
		if (bool) {
			dispatch (actions.addFavorite (payload))
		}
		else {
			dispatch (actions.removeFavorite (payload))
		}

	}



	return	<div  className={'flex column '} >
<div className={'search flex column align-center'}>
	<h1>Don't forget to check the weather</h1>
		<FormControl>
			<InputLabel className={'input'} htmlFor="my-input">City</InputLabel>
			<Input id="my-input" className={'input'}  aria-describedby="find a city" value={value} onChange={(v) => getCities (v)}/>
			<FormHelperText className={'input'} id="my-helper-text">Type a city name</FormHelperText>
		</FormControl>
			<CitiesList cities={state.cities} showList={showList} chooseCity={chooseCity} chosenCity={state.chosenCity}/>
</div>
		<div className={' '}>

			<CurrentWeatherCard currentWeather={currentWeather}  units={state.units} changeFavStatus={changeFavStatus}
			                     chosenCity={state.chosenCity||state.defaultCity}/>
		</div>

		<WeatherList forecast={forecast} units={state.units}/></div>

}
export default HomePage
