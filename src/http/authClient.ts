import { AxiosError, AxiosResponse } from 'axios';
import { createClient } from './index';
import { IErrorResponse } from '../types/IErrorResponse';

export const authClient = createClient();

authClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onResponseSuccess<T>(res:  AxiosResponse<T>): T {
  return res.data;
}

function onResponseError(error: AxiosError): Promise<AxiosError<IErrorResponse>> {
  return Promise.reject(error);
}

