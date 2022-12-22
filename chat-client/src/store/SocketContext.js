import {createContext, useReducer} from 'react';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import io from 'socket.io-client';
import SocketReducer, {CHAT_UPDATE, CLOSE_SOCKET, CONNECTION_AUTHORIZED, ERROR, INIT_SOCKET, RESET_ERROR} from './SocketReducer';

const initialState = {
  loading: false,
  error: null,
  socket: null,
  username: null,
  room: null,
  messages: {},
  participants: [],
};

export const SocketContext = createContext(initialState);

export const SocketProvider = ({children}) => {
  const [state, dispatch] = useReducer(SocketReducer, initialState);

  const navigate = useNavigate();

  const initSocket = (username, roomName, roomUUID, action) => {
    const query = {
      username,
      action,
    };
    if (roomName) query.roomName = roomName;
    if (roomUUID) query.roomUUID = roomUUID;

    const socket = io('http://localhost:5000', {
      reconnectionAttempts: 3,
      query,
    });

    //bind socket events listeners
    bindListerners(socket);

    dispatch({type: INIT_SOCKET, payload: socket});
  };

  const closeSocket = () => {
    state.socket.close();
    dispatch({type: CLOSE_SOCKET});
  };

  const emit = (event, payload) => {
    state.socket.emit(event, payload);
  };

  const resetError = () => {
    dispatch({type: RESET_ERROR});
  };

  const bindListerners = (socket) => {
    socket.on('connection:authorized', (data) => {
      //Build message structure: each key is the uuid of the message and the value is the message object
      const messages = Object.fromEntries(data.messages.map((message) => [message.uuid, message]));
      dispatch({type: CONNECTION_AUTHORIZED, payload: {username: data.username, room: data.room, messages, participants: data.participants}});
      navigate('/chat');
    });

    socket.on('chat:update', (data) => {
      dispatch({type: CHAT_UPDATE, payload: data});
    });

    socket.on('connect_error', (error) => {
      dispatch({type: ERROR, payload: error.message});
      toast(error.message, {type: 'error'});
    });

    socket.on('error', (error) => {
      dispatch({type: ERROR, payload: error.message});
      toast(error.message, {type: 'error'});
      navigate('/home');
    });
  };

  return (
    <SocketContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        username: state.username,
        socket: state.socket,
        room: state.room,
        messages: state.messages,
        participants: state.participants,
        initSocket,
        closeSocket,
        emit,
        resetError,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
