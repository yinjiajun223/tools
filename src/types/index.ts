export interface Tool {
    name: string
    path: string
    title: string
    description: string
    icon: string
    features?: string[]
    comingSoon?: boolean
}

export interface ImageFile {
    file: File
    url: string
    size: number
    width: number
    height: number
}

export interface ExcelData {
    headers: string[]
    rows: any[][]
    merges?: {
        s: { r: number; c: number }
        e: { r: number; c: number }
    }[]
} 