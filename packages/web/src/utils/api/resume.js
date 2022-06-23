import axios from 'axios';
import { handleAxiosError } from '../errors/handler';

export default {
  // GET Methods
  async get() {
    try {
      return (await axios.get('/resume')).data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async summary() {
    try {
      return (await axios.get('/resume/summary')).data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
