import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {weatherService} from '../services/weather.service'
import {StorageService} from '../services/storage.service';

const initialState = {
	cities: StorageService.load ('cities') || [],
	chosenCity: StorageService.load ('chosenCity') || {},
	weather: StorageService.load ('weather') || [],
	favorites: StorageService.load ('favorites')?.length ? StorageService.load ('favorites') : [],
	loading: false,
	error: '',
	currentWeather: StorageService.load ('currentWeather') || [],
	defaultCity: StorageService.load ('defaultCity') || {},
	units:'F'
};


export const getCitiesAsync = createAsyncThunk ('weather/cities', (data) => {
	return weatherService.getCities (data)
		.then ((response) =>
			       response.data
		)
})

export const getFiveDaysForecastByLocationKey = createAsyncThunk ('weather/weather', (data) => {
	return weatherService.getFiveDaysForecastByLocationKey (data)
		.then ((response) =>
			       response
		)
})
export const getCurrentWeather = createAsyncThunk ('weather/currentWeather', (data) => {
	return weatherService.getCurrentWeather (data)
		.then ((response) => {
			       return response
		       }
		)
})


export const getDefaultCity = createAsyncThunk ('weather/defaultCity', (data) => {
	return weatherService.getOneCity (data)
		.then ((response) =>
			       response
		)

})


export const citiesSlice = createSlice ({
	                                        name: "weather",
	                                        initialState,
	                                        reducers: {
		                                        setChosenCity: (state, action) => {
			                                        state.chosenCity = action.payload
			                                        StorageService.save ('chosenCity', action.payload)
		                                        },
		                                        addFavorite: (state = initialState, action) => {
			                                        if (action.payload.id) {
				                                        if (state.favorites?.length > 0) {
					                                        const exist = state.favorites.find (x => x.id === action.payload.id)
					                                        return
				                                        }
				                                        if (state.favorites?.length===0) {
					                                        state.favorites = [...state.favorites, action.payload]
					                                        StorageService.save ('favorites', [...state.favorites, action.payload])
				                                        }
			                                        }

		                                        },
		                                        removeFavorite: (state, action) => {
			                                        if (state.favorites?.length > 0 && action.payload.id) {
				                                        state.favorites = state.favorites.filter ((f) => f.id === action.payload.id)
				                                        StorageService.save ('favorites', state.favorites)
			                                        }
		                                        },
		                                        changeUnits(state,action){
			                                        state.units=action.payload
		                                        }
	                                        },

	                                        extraReducers: builder => {
		                                        builder.addCase (getCitiesAsync.pending, state => {
			                                        state.loading = true
		                                        })
		                                        builder.addCase (getCitiesAsync.fulfilled, (state, action) => {
			                                        state.loading = false
			                                        state.cities = [...action.payload]
			                                        state.error = ''
			                                        StorageService.save ('cities', state.cities)
		                                        })
		                                        builder.addCase (getCitiesAsync.rejected, (state, action) => {
			                                        state.loading = false
			                                        state.cities = []
			                                        // state.error = action.error.message
		                                        })
		                                        builder.addCase (getFiveDaysForecastByLocationKey.pending, (state, action) => {
			                                        state.loading = true
		                                        })
		                                        builder.addCase (getFiveDaysForecastByLocationKey.fulfilled, (state, action) => {
			                                        console.log (action, state)
			                                        state.loading = false
			                                        state.weather = action.payload
			                                        state.error = ''
			                                        StorageService.save ('weather', action.payload)
		                                        })
		                                        builder.addCase (getFiveDaysForecastByLocationKey.rejected, (state, action) => {
			                                        state.loading = false
			                                        state.weather = []
			                                        // state.error = action.error.message
		                                        })
		                                        builder.addCase (getCurrentWeather.pending, state => {
			                                        state.loading = true
		                                        })
		                                        builder.addCase (getCurrentWeather.fulfilled, (state, action) => {
			                                        console.log (action)
			                                        state.loading = false
			                                        state.currentWeather = action.payload
			                                        state.error = ''
			                                        StorageService.save ('currentWeather', state.currentWeather)
		                                        })
		                                        builder.addCase (getCurrentWeather.rejected, (state, action) => {
			                                        state.loading = false
			                                        state.currentWeather = []
			                                        // state.error = action.error.message
		                                        })
		                                        builder.addCase (getDefaultCity.pending, state => {
			                                        state.loading = true
		                                        })
		                                        builder.addCase (getDefaultCity.fulfilled, (state, action) => {
			                                        state.loading = false
			                                        state.defaultCity = action.payload
			                                        state.chosenCity = action.payload
			                                        state.error = ''
			                                        StorageService.save ('defaultCity', state.defaultCity)
		                                        })
		                                        builder.addCase (getDefaultCity.rejected, (state, action) => {
			                                        state.loading = false
			                                        state.defaultCity = {}
			                                        // state.error = action.error.message
		                                        })
	                                        }
                                        });

// Action creators are generated for each case reducer function
export const actions = citiesSlice.actions;
export default citiesSlice.reducer;
