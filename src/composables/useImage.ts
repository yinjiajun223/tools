import { ref } from 'vue'
import type { ImageFile } from '@/types'

export function useImage() {
    const imageFile = ref<ImageFile | null>(null)

    const loadImage = (file: File): Promise<ImageFile> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                const img = new Image()
                img.onload = () => {
                    resolve({
                        file,
                        url: e.target?.result as string,
                        size: file.size,
                        width: img.width,
                        height: img.height
                    })
                }
                img.onerror = reject
                img.src = e.target?.result as string
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    return {
        imageFile,
        loadImage
    }
} 