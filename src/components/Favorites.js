import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, Input, FormHelperText, List, ListItem} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrentWeatherCard from './CurrentWeatherCard';


const Favorites = () => {
	const state = useSelector ((state) => state.appstate);
	const dispatch = useDispatch ();





	return <div className={'eventiList-container'}>
		<h1>Favorites</h1><FavoriteIcon />


		{state.favorites.length > 0 &&
		<List  className={'EventiList'}>
			{state.favorites.map ((c,index=0) => {

				return <ListItem key={index++} className={'card flex column'}
				>{c.name}<FavoriteIcon />
					<CurrentWeatherCard currentWeather={c?.currentWeather}/>
				</ListItem>
			})}
		</List>
			}

	</div>
}
export default Favorites
