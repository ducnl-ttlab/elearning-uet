import { PageName } from '@/common/constants';
import { RouteRecordRaw } from 'vue-router';
import CourseListPage from '@/modules/course/pages/CourseListPage.vue';
import CreateCoursePage from '@/modules/course/pages/CreateCoursePage.vue';
import CourseDetailPage from '@/modules/course/pages/CourseDetailPage.vue';
import AcceptedPaymentPage from '@/modules/course/pages/AcceptedPaymentPage.vue';
import DeclinedPaymentPage from '@/modules/course/pages/DeclinedPaymentPage.vue';
import MainLayout from '@/modules/landing/components/layouts/MainLayout.vue';

const courseRouters: Array<RouteRecordRaw> = [
    {
        path: '/category/:id',
        component: MainLayout,
        meta: {
            isPublic: true,
        },
        children: [
            {
                path: '',
                name: PageName.COURSE_LIST_PAGE,
                component: CourseListPage,
            },
        ],
    },
    {
        path: '/course',
        component: MainLayout,
        meta: {
            isPublic: true,
        },
        children: [
            {
                path: ':courseId',
                name: PageName.COURSE_DETAIL_PAGE,
                component: CourseDetailPage,
            },
            {
                path: 'create',
                name: PageName.CREATE_COURSE_PAGE,
                component: CreateCoursePage,
            },
            {
                path: ':courseId/:code',
                name: PageName.ACCEPTED_PAYMENT_PAGE,
                component: AcceptedPaymentPage,
            },
            {
                path: ':courseId/cancel',
                name: PageName.DECLINED_PAYMENT_PAGE,
                component: DeclinedPaymentPage,
            },
        ],
    },
];

export default courseRouters;
