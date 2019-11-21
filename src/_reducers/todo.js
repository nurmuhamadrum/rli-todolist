import {
  GET_ALL_TODOS_PENDING,
  GET_ALL_TODOS_FULFILLED,
  GET_ALL_TODOS_REJECTED,
  POST_TODOS_PENDING,
  POST_TODOS_FULFILLED,
  POST_TODOS_REJECTED,
  PUT_TODOS_PENDING,
  PUT_TODOS_FULFILLED,
  PUT_TODOS_REJECTED,
  DELETE_TODOS_PENDING,
  DELETE_TODOS_FULFILLED,
  DELETE_TODOS_REJECTED,
} from '../configs/constant';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
};

const todo = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TODOS_PENDING:
    case POST_TODOS_PENDING:
    case PUT_TODOS_PENDING:
    case DELETE_TODOS_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
      };
    case GET_ALL_TODOS_FULFILLED:
    case POST_TODOS_FULFILLED:
    case PUT_TODOS_FULFILLED:
    case DELETE_TODOS_FULFILLED:
      if (action.type == PUT_TODOS_FULFILLED) {
        state.data.splice(action.index, 1, action.payload);
        return {
          ...state,
          isLoading: action.isLoading,
        };
      } else if (action.type == POST_TODOS_FULFILLED) {
        state.data.unshift(action.payload);
        return {
          ...state,
          isLoading: action.isLoading,
        };
      } else if (action.type == DELETE_TODOS_FULFILLED) {
        state.data.splice(action.index, 1);
        return {
          ...state,
          isLoading: action.isLoading,
        };
      }

      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
      };
    case GET_ALL_TODOS_REJECTED:
    case POST_TODOS_REJECTED:
    case PUT_TODOS_REJECTED:
    case DELETE_TODOS_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default todo;
