//Status codes
const FORBIDDEN = 403;
const NOT_FOUND = 404;
//Error codes
const NO_AUTH_TOKEN = 'no_auth_token';
const INVALID_AUTH_TOKEN = 'invalid_auth_token';
const ROOM_NOT_FOUND = 'room_not_found';
const ROOM_ALREADY_EXISTS = 'room_already_exists';
const ROOM_NOT_EMPTY = 'room_not_empty';
const NO_QUERY = 'no_query';
const USER_ALREADY_IN_ROOM = 'user_already_in_room';
const MESSAGE_NOT_FOUND = 'message_not_found';
const MESSAGE_NOT_OWNED = 'message_not_owned';

/**
 * @class PersonalizedError
 * @extends Error
 * @property {number} status - the status of the error
 * @property {string} code - the custom error code
 */
class PersonalizedError extends Error {
  /**
   * Class constructor
   * @param {number} status - the status of the error
   * @param {string} code - the custom error code
   * @param {string} message - the error message
   */
  constructor(status, code, message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    /**
     * @property status - the status of the error
     */
    this.status = status;
    /**
     * @property code - the custom error code
     */
    this.code = code;
  }

  toJSON() {
    return {
      ...this,
      message: this.message,
    };
  }
}

/**
 * Error utility class to throw errors
 * @class Errors
 * @memberof Utils
 */
class Errors {
  /**
   * Returns an error when the user try to perform an action that requires to be authenticated and he/she is not logged
   * @returns {PersonalizedError} - the error instance
   */
  static noAuthToken() {
    return new PersonalizedError(FORBIDDEN, NO_AUTH_TOKEN, 'No auth token provided');
  }

  static invalidAuthToken() {
    return new PersonalizedError(FORBIDDEN, INVALID_AUTH_TOKEN, 'Invalid auth token');
  }

  static roomNotFound() {
    return new PersonalizedError(NOT_FOUND, ROOM_NOT_FOUND, 'Room not found');
  }

  static roomAlreadyExists() {
    return new PersonalizedError(FORBIDDEN, ROOM_ALREADY_EXISTS, 'Room already exists');
  }

  static roomNotEmpty() {
    return new PersonalizedError(FORBIDDEN, ROOM_NOT_EMPTY, 'Room is not empty');
  }

  static noQuery() {
    return new PersonalizedError(FORBIDDEN, NO_QUERY, 'No query provided');
  }

  static userAlreadyInRoom() {
    return new PersonalizedError(FORBIDDEN, USER_ALREADY_IN_ROOM, 'User already in room');
  }

  static messageNotFound() {
    return new PersonalizedError(NOT_FOUND, MESSAGE_NOT_FOUND, 'Message not found');
  }

  static messageNotOwned() {
    return new PersonalizedError(FORBIDDEN, MESSAGE_NOT_OWNED, 'Message not owned');
  }

  static printError(err) {
    console.log(`[${err.status ?? 500}] - ${err.code}`);
    console.log(err.message);
    console.log(err.stack);
  }
}

module.exports = {Errors, PersonalizedError};
