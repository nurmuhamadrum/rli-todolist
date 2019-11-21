import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/todo';
import {API} from '../configs/api';
import {
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
  METHOD_DELETE,
} from '../configs/constant';

const todo = (method, data, len, id, index) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.get(`/todos`)
          .then(res => {
            dispatch(fetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            dispatch(fetchDataRejected(method, error));
          });
      };

    case METHOD_POST:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.post(`/todos`, data)
          .then(res => {
            const {userId, title, completed} = res.data;
            const newData = {
              userId,
              id: len + 1,
              title,
              completed,
            };
            dispatch(fetchDataFulfilled(method, newData));
          })
          .catch(error => {
            dispatch(fetchDataRejected(method, error));
          });
      };

    case METHOD_PUT:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.put(`/todos/${id}`, data)
          .then(res => {
            dispatch(fetchDataFulfilled(method, res.data, index));
          })
          .catch(error => {
            dispatch(fetchDataRejected(method, error));
          });
      };

    case METHOD_DELETE:
      return dispatch => {
        dispatch(fetchData(method, true));
        API.put(`/todos/${id}`, data)
          .then(res => {
            dispatch(fetchDataFulfilled(method, res.data, index));
          })
          .catch(error => {
            dispatch(fetchDataRejected(method, error));
          });
      };

    default:
      return method;
  }
};

export default todo;
