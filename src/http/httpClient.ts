import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { createClient } from './index';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

type HttpRequestConfig = AxiosRequestConfig;
type HttpResponse<T = any> = AxiosResponse<T>;
type HttpError = AxiosError;

export const httpClient = createClient();

httpClient.interceptors.request.use(onRequest as any);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(request: HttpRequestConfig): HttpRequestConfig {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    

    if (request.headers) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  return request;
}

function onResponseSuccess<T>(res: HttpResponse<T>): T {
  return res.data;
}

async function onResponseError(error: HttpError): Promise<any> {
  const originalRequest = error.config;

  if (error.response?.status !== 401) {
    throw error;
  }

  try {
    const { accessToken } = await authService.refresh() as any as { accessToken: string };

    accessTokenService.save(accessToken);

    return httpClient.request(originalRequest as AxiosRequestConfig);
  } catch (error) {
    throw error;
  }
}
