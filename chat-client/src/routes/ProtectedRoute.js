import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../store/AuthContext';

const ProtectedRoute = ({children}) => {
  const {username, tryLoginFromStorage} = useContext(AuthContext);

  if (!username) {
    if (localStorage.getItem('chat-user')) {
      tryLoginFromStorage();
    } else {
      return <Navigate to='/' replace />;
    }
  }
  return children;
};

export default ProtectedRoute;
