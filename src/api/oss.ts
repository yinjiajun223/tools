import { get } from '@/utils/request'

// OSS 策略响应接口
export interface OSSPolicy {
  accessId: string
  policy: string
  signature: string
  dir: string
  host: string
  expire: number
}

// 获取 OSS 上传策略
export function getOSSPolicy(): Promise<OSSPolicy> {
  return get<OSSPolicy>('/oss/signature')
}

// 获取 OSS 配置
export function getOSSConfig() {
  return {
    region: import.meta.env.VITE_OSS_REGION,
    bucket: import.meta.env.VITE_OSS_BUCKET
  }
}
