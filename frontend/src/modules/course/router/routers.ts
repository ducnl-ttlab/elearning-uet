import { PageName } from '@/common/constants';
import { RouteRecordRaw } from 'vue-router';
import LandingPage from '@/modules/homepage/pages/LandingPage.vue';
import CoursePage from '@/modules/course/pages/CoursePage.vue';
const courseRouters: Array<RouteRecordRaw> = [
    // {
    //     path: '/landing-page',
    //     name: PageName.LANDING_PAGE,
    //     component: LandingPage,
    //     meta: {
    //         isPublic: true,
    //     },
    // },
    {
        path: '/course',
        name: PageName.COURSE_PAGE,
        component: CoursePage,
        meta: {
            isPublic: true,
        },
    },
];

export default courseRouters;
