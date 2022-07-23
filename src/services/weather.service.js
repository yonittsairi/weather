import {constants} from '../constants';
import axios from 'axios';
import {StorageService} from './storage.service';


// Returns basic information about locations matching an autocomplete of the search text.
// Returns current conditions data for a specific location.
// Current conditions searches require a location key. Please use the Locations API to obtain the location key for your
// desired location. By default, a truncated version of the current conditions data is returned. The full object can be
// obtained by passing "details=true" into the url string.
async function getCurrentWeather (locationKey) {
	const res = await axios.get (`${constants.getCurrentWeatherUrl}${locationKey}${constants.apiKey}`)
	return res.data[0]

}

// Returns an array of daily forecasts for the next 5 days for a specific location. Forecast searches require a
// location key. Please use the Locations API to obtain the location key for your desired location. By default, a
// truncated version of the hourly forecast data is returned. The full object can be obtained by passing "details=true"
// into the url string.
async function getFiveDaysForecastByLocationKey (locationKey) {
	const res = await axios.get (`${constants.getFiveDayLocationUrl}${locationKey}${constants.apiKey}`)
	return res.data

}

async function getCities (q) {
	const res = await axios.get (`${constants.locationsUrl}${constants.apiKey}&q=${q}`)
	return res.data

}

async function getOneCity (key) {
	const defaultCity = StorageService.load ('defaultCity')
	if (defaultCity.Key) {
		return defaultCity
	}
	const res = await axios.get (`${constants.oneCityUrl}${key}${constants.apiKey}`)
	return res.data


}

export const weatherService = {
	getFiveDaysForecastByLocationKey,
	getCities,
	getCurrentWeather,
	getOneCity
}
