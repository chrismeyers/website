import axios from 'axios';
import { handleAxiosError } from '../errors/handler';

export const get = async () => {
  try {
    return (await axios.get('/resume')).data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const summary = async () => {
  try {
    return (await axios.get('/resume/summary')).data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
