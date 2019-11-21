import {
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
  METHOD_DELETE,
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

export const fetchData = (method, bool) => {
  let methodType;

  switch (method) {
    case METHOD_GET:
      methodType = GET_ALL_TODOS_PENDING;
      break;
    case METHOD_POST:
      methodType = POST_TODOS_PENDING;
      break;
    case METHOD_PUT:
      methodType = PUT_TODOS_PENDING;
      break;
    case METHOD_DELETE:
      methodType = DELETE_TODOS_PENDING;
      break;
  }

  return {
    type: methodType,
    payload: bool,
  };
};

export const fetchDataFulfilled = (method, data, index) => {
  let methodType;

  switch (method) {
    case METHOD_GET:
      methodType = GET_ALL_TODOS_FULFILLED;
      break;
    case METHOD_POST:
      methodType = POST_TODOS_FULFILLED;
      break;
    case METHOD_PUT:
      methodType = PUT_TODOS_FULFILLED;
      break;
    case METHOD_DELETE:
      methodType = DELETE_TODOS_FULFILLED;
      break;
  }

  return {
    type: methodType,
    payload: data,
    index,
    isLoading: false,
  };
};

export const fetchDataRejected = (method, error) => {
  let methodType;

  switch (method) {
    case METHOD_GET:
      methodType = GET_ALL_TODOS_REJECTED;
      break;
    case METHOD_POST:
      methodType = POST_TODOS_REJECTED;
      break;
    case METHOD_PUT:
      methodType = PUT_TODOS_REJECTED;
      break;
    case METHOD_DELETE:
      methodType = DELETE_TODOS_REJECTED;
      break;
  }
  return {
    type: methodType,
    payload: error,
    isLoading: false,
  };
};
