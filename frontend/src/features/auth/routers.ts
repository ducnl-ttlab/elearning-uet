import { PageName } from '@/common/constants';
import { RouteRecordRaw } from 'vue-router';
import AuthLayout from '../../layouts/AuthLayout.vue';
import LoginPage from './pages/LoginPage.vue';
import GoogleLogin from './pages/GoogleLogin.vue';

const authRouters: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: '/login/:token',
                name: PageName.LOGIN_PAGE,
                component: LoginPage,
            },
            {
                path: '/auth/google/:token',
                name: PageName.LOGIN_PAGE,
                component: GoogleLogin,
            },
        ],
    },
];

export default authRouters;
