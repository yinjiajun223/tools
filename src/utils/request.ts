import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const ossService: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_OSS_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
ossService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在这里可以添加token等认证信息
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
ossService.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status } = response

    // 这里可以根据后端的响应结构进行调整
    if (status === 200) {
      return data
    }

    // 处理业务错误
    ElMessage.error(data.message || '请求失败')
    return Promise.reject(new Error(data.message || '请求失败'))
  },
  (error: AxiosError) => {
    // 处理 HTTP 错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          ElMessage.error('未授权，请重新登录')
          // 可以在这里处理登录过期的逻辑
          break
        case 403:
          ElMessage.error('拒绝访问')
          break
        case 404:
          ElMessage.error('请求错误，未找到该资源')
          break
        case 500:
          ElMessage.error('服务器错误')
          break
        default:
          ElMessage.error('网络错误')
      }
    } else {
      // 处理网络错误
      if (error.message.includes('timeout')) {
        ElMessage.error('请求超时')
      } else {
        ElMessage.error('网络连接错误')
      }
    }
    return Promise.reject(error)
  }
)

// 封装 GET 请求
export function get<T>(url: string, params?: any): Promise<T> {
  return ossService.get(url, { params })
}

// 封装 POST 请求
export function post<T>(url: string, data?: any): Promise<T> {
  return ossService.post(url, data)
}

// 封装 PUT 请求
export function put<T>(url: string, data?: any): Promise<T> {
  return ossService.put(url, data)
}

// 封装 DELETE 请求
export function del<T>(url: string): Promise<T> {
  return ossService.delete(url)
}

export default ossService
