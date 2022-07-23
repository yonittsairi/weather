import {Link} from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {actions} from '../store/Reducers';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const pages = [{name: 'Home', nav: '/'}, {name: 'Favorites', nav: '/favorites'}];


const Header = () => {
	const [anchorElNav, setAnchorElNav] = useState (null);
	const [anchorElUser, setAnchorElUser] = useState (null);
	const dispatch = useDispatch ();
	const state = useSelector ((state) => state.appstate);
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav (event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav (null);
	};

	function convertForecastUnits () {
		console.log ()
		const newUnit = state.units === 'F' ? 'C' : 'F'
		dispatch (actions.changeUnits (newUnit))
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean (anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: {xs: 'block', md: 'none'}
							}}
						>
							{pages.map (({name, nav}) => (
								<Link to={nav} key={name}>

									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign="center">{name}</Typography>
									</MenuItem></Link>
							))}


						</Menu>
						<button className={'btn'} onClick={() => convertForecastUnits ()}>{state.units}°
						</button>
					</Box>
					<Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
						<div style={{position: 'fixed', right: 60}}>
							<button className={'btn'}
							        onClick={() => convertForecastUnits ()}>{state.units}°
							</button>
						</div>
						{pages.map (({name, nav}, index) => (
							<Link to={nav} key={nav}
							>
								<Button
									onClick={handleCloseNavMenu}
									sx={{my: 2, color: 'white', display: 'block'}}
								>

									{name}
								</Button></Link>
						))}


					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;
