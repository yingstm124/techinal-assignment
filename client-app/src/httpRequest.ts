import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
interface IHeader {
  key: string;
  value: string;
}

export interface HttpRequestError<T> extends Error {
  status: number;
  statusText: string;
  data: T;
}
class HttpRequest {
  axiosInstance: AxiosInstance;
  constructor(url: string) {
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: 120000,
    });
    this.axiosInstance.defaults.headers["Content-Type"] = "application/json";
  }

  setHeader(header: IHeader) {
    this.axiosInstance.defaults.headers.common[header.key] = header.value;
  }

  get<type>(methodName: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<type>(methodName, config);
  }

  post<type>(methodName: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post<type>(methodName, data, config);
  }

  put<type>(methodName: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.put<type>(methodName, data, config);
  }

  delete<type>(methodName: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.delete<type>(methodName, config);
  }
}
const httpRequest = new HttpRequest("http://localhost:5000");
export default httpRequest;
