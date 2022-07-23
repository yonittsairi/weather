import {List, ListItem} from '@mui/material';
import React from 'react';

const CitiesList = ({cities, showList,chooseCity,chosenCity}) => {
	if (cities.length > 0 & showList) {
		return <ul className={'cities'}>
			{cities.map ((c) => {
				if (chosenCity.Key === c.Key) {
					return <li  className={'city-item chosen'} key={c.Key}
					                 onClick={(x) => chooseCity (c)}>{c?.LocalizedName} , {c?.Country.ID} </li>

				}
				return <li className={'city-item'} key={c.Key}
				                 onClick={(x) => chooseCity (c)}>{c?.LocalizedName} , {c?.Country.ID} </li>
			})}
		</ul>
	}
	else {
		return ''
	}
}
export default CitiesList
