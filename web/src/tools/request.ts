import axios, { AxiosInstance } from "axios";


function getTokens(): string {
    return '';    
}

export class Request {

    instance: AxiosInstance;

    public constructor() {
        this.instance = axios.create({
            baseURL: 'https://tools.bertguan.top/',
            headers: {},
            timeout: 5000,
        });

    }

    public request() {

        this.instance.interceptors.request.use(function (config) {
            config.headers["Authorization"] = getTokens()
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        this.instance.interceptors.response.use(function (response) {
            if (response.status === 200) {
                return response.data
            } else {
                return Promise.reject(new Error('error'))
            }
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
}





