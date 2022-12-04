import { PageName } from '@/common/constants';
import { RouteRecordRaw } from 'vue-router';
import CourseListPage from '@/modules/course/pages/CourseListPage.vue';
import CourseDetailPage from '@/modules/course/pages/CourseDetailPage.vue';
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
        ],
    },
];

export default courseRouters;
