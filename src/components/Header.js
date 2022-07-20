import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
	useEffect (() => {
	}, [])


	return <div className={'main-header'}>
		<div className={'flex space-between'} style={{width:'20%'}}>
		<Link to={'/'}>
			<span>Home</span>
		</Link>
		<Link to={'/favorites'}>

		<span>Favorites</span>
			</Link ></div>

	</div>
}
export default Header
