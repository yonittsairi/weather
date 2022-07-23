import * as React from 'react';
import Stack from '@mui/material/Stack';
import {Alert} from '@mui/material';
import {useSelector} from 'react-redux';

const ErrorSnackBar = () => {

	const state = useSelector ((state) => state.appstate)
	if(state?.error){
		return (
			<Stack   style={{position:'absolute' ,bottom:'10%',margin:'auto' ,maxWidth:800} }>
				<Alert severity="error">{state.error}</Alert>
			</Stack>
		);
	}
	else {
		return ''
	}

}
export default ErrorSnackBar
