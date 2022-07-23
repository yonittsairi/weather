import { configureStore } from "@reduxjs/toolkit";
import appSlice from './Reducers'
export function createStore() {
	return configureStore({
		                      reducer: {
			                      appstate: appSlice
		                      },

	                      });

}

export const store = createStore();
