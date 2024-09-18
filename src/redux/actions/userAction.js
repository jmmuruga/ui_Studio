import axios from 'axios';
import { apiUrl } from '../apiUrl';

export const getUsers = () => axios.get(`${apiUrl}/StudentClass/Get`);

export const fetchUsersList = () => async (dispatch) => {
    try {
      const response = await fetch(apiUrl+'/StudentClass/Get');
      const data = await response.json();
      dispatch({
        type: 'FETCH_USERS_SUCCESS',
        payload: data
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_USERS_FAILURE',
        payload: error.message
      });
    }
  };
