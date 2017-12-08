const initialState = {
	isLoggedIn: false,
	user: null,
	error: null
}

export default function sessionReducer(state = initialState, aciton) {
	switch (action.type) {
		case 'LOGIN_SUCCESS': {
			state = {
				...state,
				isLoggedIn: true,
				user: {
					id: action.user.id,
					name: action.user.name
				}
			}
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