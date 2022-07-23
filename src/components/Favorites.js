import React from 'react';
import { List, ListItem} from '@mui/material';
import { useSelector} from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrentWeatherCard from './CurrentWeatherCard';
import {actions} from '../store/Reducers';


const Favorites = () => {
	const state = useSelector ((state) => state.appstate);
	return <div >
		<h1>Favorites</h1>

		{state.favorites.length > 0 &&
		<ul  >
			{state.favorites.map ((c,index=0) => {
				return <li key={c.id} className={'flex column'}>
					<CurrentWeatherCard favoriteList={true} isFavorite={true} favoriteId={c.id} key={c.id} currentWeather={c?.currentWeather} name={c.name} />
				</li>
			})}
		</ul>
			}

	</div>
}
export default Favorites
