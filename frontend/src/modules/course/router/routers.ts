import { PageName } from '@/common/constants';
import { RouteRecordRaw } from 'vue-router';
import CourseListPage from '@/modules/course/pages/CourseListPage.vue';
import CreateCoursePage from '@/modules/course/pages/CreateCoursePage.vue';

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
        path: '/create-course',
        component: MainLayout,
        meta: {
            isPublic: true,
        },
        children: [
            {
                path: '',
                name: PageName.CREATE_COURSE_PAGE,
                component: CreateCoursePage,
            },
        ],
    },
];

export default courseRouters;
