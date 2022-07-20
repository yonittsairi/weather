import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, Input, FormHelperText, List, ListItem} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
	getCitiesAsync,
	actions,
	getFiveDaysForecastByLocationKey,
	getCoordinateData,
	getDefaultCity
} from '../store/Reducers';
import {constants} from '../constants';
import {StorageService} from '../services/storage.service';


const Favorites = () => {
	const state = useSelector ((state) => state.cities);
	const dispatch = useDispatch ();





	return <div>Favorites<FavoriteIcon />



		{state.favorites.length > 0 &&
		<List>
			{state.favorites.map ((c) => {
				return <ListItem key={c.id} style={{color: 'red'}}
				>{c.name}<FavoriteIcon />
				</ListItem>
			})}
		</List>
			}

	</div>
}
export default Favorites
