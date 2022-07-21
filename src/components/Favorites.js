import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, Input, FormHelperText, List, ListItem} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrentWeatherCard from './CurrentWeatherCard';


const Favorites = () => {
	const state = useSelector ((state) => state.appstate);
	const dispatch = useDispatch ();





	return <div>Favorites<FavoriteIcon />


		{state.favorites.length > 0 &&
		<List>
			{state.favorites.map ((c,index=0) => {

				return <ListItem key={index++} style={{color: 'red'}}
				>{c.name}<FavoriteIcon />
					<CurrentWeatherCard currentWeather={c?.currentWeather}/>
				</ListItem>
			})}
		</List>
			}

	</div>
}
export default Favorites
