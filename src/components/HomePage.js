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
import {StorageService} from '../services/storage.service';
import {dateFormat} from '../services/utils.service'

const HomePage = () => {
	const [chosenCity, setChosenCity] = useState ({})
	const [forecast, setForecast] = useState ({DailyForecasts: []})
	const [currentWeather, setCurrentWeather] = useState ( {})
	const [isFavorite, setIsFavorite] = useState ( false)
	const [showList, setShowList] = useState ( false)
	const state = useSelector ((state) => state.cities);
	const dispatch = useDispatch ();
	const chooseCity = (e) => {
		dispatch (actions.setChosenCity (e))

		setChosenCity (e)
		getForecast (e.Key)

	}
	useEffect (() => {
		if (state?.chosenCity?.Key==constants.telAviv){
			setChosenCity(state.chosenCity)
				getForecast(constants.telAviv)
		}else {
			dispatch(getDefaultCity(constants.telAviv))
			setChosenCity(state.defaultCity)
			getForecast(constants.telAviv)
		}


	}, [])

	const getCities = async (e) => {
		dispatch (getCitiesAsync (e.target.value))
		setShowList(true)
	}

	const getForecast = (data) => {
		dispatch(getCurrentWeather(data))
		dispatch (getFiveDaysForecastByLocationKey (data))
		setForecast (state.weather)
		setCurrentWeather(state.currentWeather.data[0])
	}

	function changeFavStatus (bool) {
		setIsFavorite(bool)
		const payload={id:chosenCity?.Key,name:chosenCity.LocalizedName,currentWeather}
		if (bool) {
			dispatch (actions.addFavorite(payload))
		}else {
			dispatch(actions.removeFavorite(payload))
		}

	}

	return <div>

		<FormControl>
			<InputLabel htmlFor="my-input">City</InputLabel>
			<Input id="my-input" aria-describedby="find a city" onChange={(v) => getCities (v)}/>
			<FormHelperText id="my-helper-text">Type a city name</FormHelperText>
		</FormControl>
		{/*{*/}
		{/*	JSON.stringify(currentWeather)*/}
		{/*}*/}



		{isFavorite? <FavoriteIcon onClick={()=>changeFavStatus(false)}/>:
		<FavoriteBorderIcon  onClick={()=>changeFavStatus(true)}/>}
		<div >
		{(state.cities.length > 0 && showList)&&
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
		<div>Weather in {chosenCity?.LocalizedName}</div>
		<div>{currentWeather?.Temperature.Metric.Value}   {currentWeather?.Temperature.Metric.Unit}</div>
		<div>{currentWeather?.Temperature.Imperial.Value}   {currentWeather?.Temperature.Imperial.Unit}</div>
		<div className={'eventiList-container'}>
		<div className={'EventiList'}>
		{forecast?.DailyForecasts?
			forecast.DailyForecasts.map (({Date, Temperature, Day, Night}) => {
												const date= dateFormat(Date)
				                             const DayIcon = String (Day.Icon).length >= 2 ? Day.Icon : '0' + Day.Icon
				                             const NightIcon = String (Night.Icon).length >= 2 ? Night.Icon : '0' + Night.Icon
				                             return <div key={Date}>
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
			):''
		}
		</div>
	</div>
	</div>
}
export default HomePage
