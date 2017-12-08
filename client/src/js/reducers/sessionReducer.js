const initialState = {
	isLoggedIn: false,
	user: null,
	error: null
}

export default function sessionReducer(state = initialState, action) {
	switch (action.type) {
		case 'LOGIN_SUCCESS': {
			state = {
				...state,
				isLoggedIn: true,
				user: {
					id: action.data.user.id,
					name: action.data.user.username
				}
			}
			console.log('Signed in successfully: ', state);
			break;
		}
		case 'LOGIN_FAILURE': {
			state = {
				...state,
				isLoggedIn: false,
				user: null,
				error: action.error
			}
			break;
		}
		case 'ACTION_LOGOUT': {
			state = {
				...state,
				isLoggedIn: false,
				user: null,
				error: null
			}
			break;
		}
		default: { }
	}
	return state;
}