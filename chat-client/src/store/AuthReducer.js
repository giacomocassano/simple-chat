export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        username: null,
      };
    default:
      return state;
  }
};
