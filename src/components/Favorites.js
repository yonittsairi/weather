import React from 'react';
import { List, ListItem} from '@mui/material';
import { useSelector} from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrentWeatherCard from './CurrentWeatherCard';


const Favorites = () => {
	const state = useSelector ((state) => state.appstate);


	return <div className={'eventiList-container'}>
		<h1>Favorites</h1>


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
