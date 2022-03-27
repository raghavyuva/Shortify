import { UserTypes } from "../constants/action-types";


const initialState = {
	user: [],
	token: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case UserTypes.SET_USER:
			return { ...state, user: payload };
		case UserTypes.SET_TOKEN:
			return { ...state, token: payload };
		default:
			return state;
	}
};
