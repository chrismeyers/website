import axios from 'axios';
import { handleAxiosError } from '../errors/handler';

export const get = async () => {
  try {
    return (await axios.get('/projects')).data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const getById = async (id) => {
  try {
    return (await axios.get(`/projects/${id}`)).data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
