export const INIT_SOCKET = 'INIT_SOCKET';
export const CLOSE_SOCKET = 'CLOSE_SOCKET';
export const CONNECTION_AUTHORIZED = 'CONNECTION_AUTHORIZED';
export const CHAT_UPDATE = 'CHAT_UPDATE';
export const ERROR = 'ERROR';
export const RESET_ERROR = 'RESET_ERROR';

const SocketReducer = (state, action) => {
  switch (action.type) {
    case INIT_SOCKET:
      return {
        ...state,
        socket: action.payload,
        loading: true,
      };
    case CLOSE_SOCKET:
      return {
        ...state,
        socket: null,
      };
    case CONNECTION_AUTHORIZED:
      return {
        ...state,
        username: action.payload.username,
        room: action.payload.room,
        messages: action.payload.messages,
        participants: action.payload.participants,
        loading: false,
      };
    case CHAT_UPDATE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.uuid]: action.payload,
        },
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default SocketReducer;
