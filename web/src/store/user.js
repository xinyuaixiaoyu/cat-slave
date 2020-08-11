export const defaultState = {
	isAdmin: false,
};

export const reducer = (state, action = false) => {
	return { ...state, isAdmin: action };
};
