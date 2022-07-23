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
import {dateFormat} from '../services/utils.service'
import WeatherList from './WeatherList';
import CurrentWeatherCard from './CurrentWeatherCard';
import Button from '@mui/material/Button';

const HomePage = () => {
	const [chosenCity, setChosenCity] = useState ({id: -1})
	const [forecast, setForecast] = useState ({DailyForecasts: []})
	const [currentWeather, setCurrentWeather] = useState ({})
	const [isFavorite, setIsFavorite] = useState (false)
	const [showList, setShowList] = useState (false)
	const [units,setUnits]=useState('F')
	const [value, setValue] = useState ('')
	const [favorites, setFavoriteList] = useState ([])
	const state = useSelector ((state) => state.appstate);
	const dispatch = useDispatch ();
	const chooseCity = (e) => {
		dispatch (actions.setChosenCity (e))
		setChosenCity (e)
		getForecast (e.Key)
	}
	useEffect (() => {
		checkIfIncludedInFavorites (state.defaultCity)
		setFavoriteList (state.favorites)
		if (state?.chosenCity?.Key == constants.telAviv) {
			setChosenCity (state.chosenCity)
			getForecast (constants.telAviv)
			checkIfIncludedInFavorites (state.chosenCity)
		}
		else {
			dispatch (getDefaultCity (constants.telAviv))
			setChosenCity (state.defaultCity)
			getForecast (constants.telAviv)
		}


	}, [])

	const checkIfIncludedInFavorites = () => {
		if (favorites?.length > 0) {
			const existsInFav = favorites.find ((f) => f.id === chosenCity.Key)
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
		checkIfIncludedInFavorites (chosenCity)
		dispatch (getCurrentWeather (data))
		dispatch (getFiveDaysForecastByLocationKey (data))
		setForecast (state.weather)
		setCurrentWeather (state.currentWeather)
	}

	function changeFavStatus (bool) {
		setIsFavorite (bool)
		const payload = {id: chosenCity?.Key, name: chosenCity.LocalizedName, currentWeather}
		if (bool) {
			dispatch (actions.addFavorite (payload))
		}
		else {
			dispatch (actions.removeFavorite (payload))
		}

	}


	function convertForecastUnits () {
		const newUnit= units==='F'?'C':'F'
		setUnits(newUnit)

	}

	return	<div  >
		<Button style={{color:'white'}} onClick={()=>convertForecastUnits()}>{units}
		</Button>
		<FormControl>
			<InputLabel htmlFor="my-input">City</InputLabel>
			<Input id="my-input" aria-describedby="find a city" value={value} onChange={(v) => getCities (v)}/>
			<FormHelperText id="my-helper-text">Type a city name</FormHelperText>
		</FormControl>


		<div>
			{(state.cities.length > 0 && showList) &&
			<List>
				{state.cities.map ((c) => {
					if (chosenCity.Key === c.Key) {
						return <ListItem key={c.Key} style={{color: 'red'}}
						                 onClick={(x) => chooseCity (c)}>{c?.LocalizedName} , {c?.Country.ID} </ListItem>

					}
					return <ListItem key={c.Key}
					                 onClick={(x) => chooseCity (c)}>{c?.LocalizedName} , {c?.Country.ID} </ListItem>
				})}
			</List>
			}</div>
		<div className={'card flex column'}>
			<div><h4>Weather in {chosenCity?.LocalizedName}</h4><span>{isFavorite ?
				<FavoriteIcon className={'hover'} onClick={() => changeFavStatus (false)}/> :
				<FavoriteBorderIcon className={'hover'} onClick={() => changeFavStatus (true)}/>}</span></div>
			<CurrentWeatherCard currentWeather={currentWeather} units={units}/>

		</div>
		<WeatherList forecast={forecast} units={units}/></div>

}
export default HomePage
