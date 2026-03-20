import { HttpStatusCode } from '@/contants/httpStatusCode.enum';
import axios, { AxiosInstance } from 'axios';

class Http {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.accessToken = localStorage.getItem('access_token') || '';

    this.instance.interceptors.request.use(
      async (config) => {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
              throw new Error('Không có Refresh Token');
            }

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh-token`, {
              refreshToken: refreshToken
            });

            const { token, refreshToken: newRefreshToken } = response.data;

            localStorage.setItem('access_token', token);
            localStorage.setItem('refresh_token', newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${token}`;

            return this.instance(originalRequest);
          } catch (refreshError) {
            console.log('Refresh token thất bại, đuổi về trang Login');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        } else if (error.response?.status === HttpStatusCode.NotFound) {
          window.location.href = '/404';
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
