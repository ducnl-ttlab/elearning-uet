import { PageName } from '@/common/constants';
import { RouteRecordRaw } from 'vue-router';
import LandingPage from '@/modules/homepage/pages/LandingPage.vue';
const homeRouters: Array<RouteRecordRaw> = [
    {
        path: '/landing-page',
        name: PageName.LANDING_PAGE,
        component: LandingPage,
        meta: {
            isPublic: true,
        },
    },
];

export default homeRouters;
