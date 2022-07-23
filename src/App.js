import HomePage from './components/HomePage';
import Header from './components/Header';
import Favorites from './components/Favorites';
import {Route, Routes } from 'react-router';

function App () {
	return (
		<div className="container" >
			<Header/>
			<div  className="main-container" id="cloud-intro">
			<Routes >
				<Route element={<Favorites/>} path="/favorites" />
				<Route element={<HomePage/>} path="/" /></Routes ></div>
		</div>
	);
}

export default App;
