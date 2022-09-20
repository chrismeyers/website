import axios from 'axios';
import { handleAxiosError } from '../errors/handler';

export const get = async () => {
  try {
    return (await axios.get('/builds')).data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const getById = async (id) => {
  try {
    return (await axios.get(`/builds/${id}`)).data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
