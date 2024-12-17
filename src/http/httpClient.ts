import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { createClient } from './index';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

type HttpResponse<T> = AxiosResponse<T>;
type HttpError = AxiosError;

export const httpClient = createClient();

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(request: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
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

async function onResponseError(error: HttpError): Promise<HttpError | unknown> {
  const originalRequest = error.config;

  if (error.response?.status !== 401) {
    throw error;
  }

  const { accessToken } = await authService.refresh();

  accessTokenService.save(accessToken);

  return httpClient.request(originalRequest as AxiosRequestConfig);
}

