import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        name: 'register-base',
        path: '/',
        component: () => import('../pages/register.vue')
    },
    {
        name: 'login-base',
        path: '/login',
        component: () => import('../pages/login.vue')
    },
    {
        path: '/home/2fa',
        component: () => import('../pages/2fa/home.vue')
    },
    {
        path: '/home/2fa/new',
        component: () => import('../pages/2fa/new.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
