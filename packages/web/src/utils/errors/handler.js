import { AxiosError } from 'axios';
import ConnectionError from './types/connection';
import ResponseError from './types/response';

export function handleAxiosError(error) {
  switch (error.code) {
    case AxiosError.ERR_NETWORK:
      return new ConnectionError();
    case AxiosError.ERR_BAD_REQUEST:
    case AxiosError.ERR_BAD_RESPONSE:
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { data } = error.response;
      return new ResponseError(data?.error, data?.message, data?.statusCode);
    default:
      // Something happened in setting up the request that triggered an Error
      return error;
  }
}
