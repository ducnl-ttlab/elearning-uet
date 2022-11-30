import { PageName } from '@/common/constants';
import { RouteRecordRaw } from 'vue-router';
import AuthLayout from '@/modules/auth/components/layouts/common/AuthLayout.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import CreatePasswordPage from '../pages/CreatePasswordPage.vue';
import SelectRolePage from '../pages/SelectRolePage.vue';

const authRouters: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                name: PageName.LOGIN_PAGE,
                component: LoginPage,
            },
            {
                path: 'register',
                name: PageName.REGISTER_PAGE,
                component: RegisterPage,
            },
            {
                path: 'create-password/:token',
                name: PageName.CREATE_PASSWORD_PAGE,
                component: CreatePasswordPage,
            },
            // {
            //     path: '/auth/google/:token',
            //     name: PageName.LOGIN_PAGE,
            //     component: GoogleLogin,
            // },
        ],
    },
    {
        path: '/select-role',
        name: PageName.SELECT_ROLE_PAGE,
        component: SelectRolePage,
    },
];

export default authRouters;
