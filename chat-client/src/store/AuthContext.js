import {createContext, useReducer} from 'react';
//reducer
import {AuthReducer} from './AuthReducer';
//actions
import {LOGIN, LOGOUT} from './AuthReducer';

const initialState = {
  username: null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = (username) => {
    dispatch({
      type: LOGIN,
      payload: username,
    });
    localStorage.setItem('username', JSON.stringify(username));
  };

  const tryLoginFromStorage = () => {
    const username = JSON.parse(localStorage.getItem('username'));
    if (username) {
      login(username);
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
    localStorage.removeItem('username');
  };

  return <AuthContext.Provider value={{username: state.username, login, tryLoginFromStorage, logout}}>{children}</AuthContext.Provider>;
};
