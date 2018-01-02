const initialState = {
	isAuthenticated: false,
	user: {},
	errors: {}
};

function isEmpty(obj) {
	for(var key in obj) {
		if(obj.hasOwnProperty(key))
			return false;
	}
	return true;
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_CURRENT_USER': {
			state = {
				...state,
				isAuthenticated: !isEmpty(action.user),
				user: action.user,
				errors: {}
			}
			break;
		}
		case 'SET_AUTH_ERRORS': {
			state = {
				...state,
				errors: {
					...state.errors,
					...action.errors
				}
			}
			break;
		}
		default: { }
	}
	return state;
}