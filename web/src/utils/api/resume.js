import axios from 'axios';
import { handleAxiosError } from '../errors/handler';

export default {
  // GET Methods
  get() {
    return new Promise((resolve, reject) => {
      return axios
        .get('/resume')
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },

  getSummary() {
    return new Promise((resolve, reject) => {
      return axios
        .get('/resume/summary')
        .then((response) => resolve(response))
        .catch((error) => reject(handleAxiosError(error)));
    });
  },
};
