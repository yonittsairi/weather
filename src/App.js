import HomePage from './components/HomePage';
import Header from './components/Header';
import Favorites from './components/Favorites';
import {Route, Routes} from 'react-router';
import ErrorSnackBar from './components/ErrorSnackBar';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from './store/Reducers';
import {useState} from 'react';

function App () {
	const state = useSelector ((state) => state.appstate);
	const [mode, setMode] = useState (' light');
	return (
		<div className={'container'+mode}>
			<div className="main-container" id="cloud-intro">
				<Routes>
					<Route element={<Favorites/>} path="/favorites"/>
					<Route element={<HomePage/>} path="/"/></Routes>
				<ErrorSnackBar/>
			</div>

		</div>
	);
}

export default App;
