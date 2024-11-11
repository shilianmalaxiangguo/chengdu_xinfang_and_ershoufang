// src/utils/http.ts

import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

class Http {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors();
  }

  private interceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 在发送请求之前做些什么
        // 例如: 添加 token
        // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
      },
      (error: AxiosError) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response.data;
      },
      (error: AxiosError) => {
        // 对响应错误做点什么
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // 未授权, 跳转到登录页
              // router.push('/login');
              break;
            case 404:
              console.log('请求的资源不存在');
              break;
            case 500:
              console.log('服务器错误');
              break;
            default:
              console.log(`其他错误: ${error.response.status}`);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, config);
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config);
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config);
  }
}

// 创建 Http 实例
const http = new Http({
  baseURL: 'https://api.fangchancd.com/api/', // 设置基础URL
  timeout: 10000, // 设置时间
  // 其他配置...
});

export default http;
