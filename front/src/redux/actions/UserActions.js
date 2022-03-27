import { UserTypes } from "../constants/action-types";

export const setUser = (user) => {
	return {
		type: UserTypes.SET_USER,
		payload: user,
	};
};

export const setToken = (token) => {
	return {
		type: UserTypes.SET_TOKEN,
		payload: token,
	};
};