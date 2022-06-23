import axios from 'axios';
import { handleAxiosError } from '../errors/handler';

export default {
  // GET Methods
  async get() {
    try {
      return (await axios.get('/projects')).data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async getById(id) {
    try {
      return (await axios.get(`/projects/${id}`)).data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
