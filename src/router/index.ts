import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/image-tools',
        name: 'imageTools',
        component: () => import('@/components/image-tools/ImageCompressor.vue')
    },
    {
        path: '/excel-tools',
        name: 'excelTools',
        component: () => import('@/components/excel-tools/ExcelParser.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router 