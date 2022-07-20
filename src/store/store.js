import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from './Reducers'
export function createStore() {
	return configureStore({
		                      reducer: {
			                      cities: citiesReducer
		                      },

	                      });

}

export const store = createStore();
