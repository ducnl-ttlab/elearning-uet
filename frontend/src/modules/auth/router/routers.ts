import { PageName } from '@/common/constants';
import { RouteRecordRaw } from 'vue-router';
import AuthLayout from '@/modules/auth/components/layouts/common/AuthLayout.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import GoogleLogin from '../pages/GoogleLogin.vue';

const authRouters: Array<RouteRecordRaw> = [
    {
        path: '',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: PageName.LOGIN_PAGE,
                component: LoginPage,
                meta: {
                    onlyWhenLoggedOut: true,
                    isPublic: true,
                },
            },
            {
                path: '/register',
                name: PageName.REGISTER_PAGE,
                component: RegisterPage,
                meta: {
                    onlyWhenLoggedOut: true,
                    isPublic: true,
                },
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
