import axios from 'axios';
import { handleAxiosError } from '../errors/handler';

export default {
  // GET Methods
  async get() {
    try {
      return (await axios.get('/builds')).data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async getById(id) {
    try {
      return (await axios.get(`/builds/${id}`)).data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
