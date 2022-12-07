<template>
    <div class="display-options d-flex flex-row gap-3">
        <img
            @click="handleGridClick()"
            src="@/assets/course/icons/display-grid.png"
            :class="{
                'active-display':
                    userCourseListDisplayMode === CourseListDisplayMode.GRID,
            }"
            alt=""
            class="display-button"
        />
        <img
            @click="handleListClick()"
            src="@/assets/course/icons/display-list.png"
            alt=""
            :class="{
                'active-display':
                    userCourseListDisplayMode === CourseListDisplayMode.LIST,
            }"
            class="display-button"
        />
    </div>
    <SortTable />
    <CourseListTable v-if="userCourseListDisplayMode === CourseListDisplayMode.LIST" />
    <BaseNoResult
        v-if="studentCourseList?.length === 0 && instructorCourseList.length === 0"
        :message="$t('course.errors.emptyCourseList')"
    />
    <div v-if="userRole === SystemRole.INSTRUCTOR">
        <InstructorCourseList
            v-if="userCourseListDisplayMode === CourseListDisplayMode.LIST"
        />
        <InstructorCourseGrid
            v-if="userCourseListDisplayMode === CourseListDisplayMode.GRID"
        />
    </div>
    <div v-if="userRole === SystemRole.STUDENT">
        <StudentCourseList
            v-if="userCourseListDisplayMode === CourseListDisplayMode.LIST"
        />
        <StudentCourseGrid
            v-if="userCourseListDisplayMode === CourseListDisplayMode.GRID"
        />
    </div>
</template>

<script lang="ts">
import { PageName, SystemRole } from '@/common/constants';
import { userModule } from '@/modules/user/store/user.store';
import { Options, Vue } from 'vue-class-component';
import {
    CourseListDisplayMode,
    MAX_COURSE_GRID_ITEMS,
} from '../constants/course.constants';
import { userCourseModule } from '../store/user-course.store';
import { commonModule } from '@/modules/common/store/common.store';
import { getInstructorList } from '@/modules/common/services/common';
import { showErrorNotificationFunction } from '@/common/helpers';
import { getCourseList } from '../services/course';
import { getStudentCourseList } from '../services/user-course';
import localStorageTokenService from '@/common/tokenService';

import InstructorCourseList from '../components/course-owned/InstructorCourseList.vue';
import InstructorCourseGrid from '../components/course-owned/InstructorCourseGrid.vue';
import StudentCourseList from '../components/course-owned/StudentCourseList.vue';
import StudentCourseGrid from '../components/course-owned/StudentCourseGrid.vue';
import SortTable from '../components/course-owned/SortTable.vue';
import CourseListTable from '../components/course-owned/CourseListTable.vue';

@Options({
    components: {
        InstructorCourseList,
        InstructorCourseGrid,
        StudentCourseList,
        StudentCourseGrid,
        SortTable,
        CourseListTable,
    },
})
export default class UserCourseListPage extends Vue {
    CourseListDisplayMode = CourseListDisplayMode;

    SystemRole = SystemRole;

    get instructorCourseList() {
        return userCourseModule.instructorCourseList;
    }

    get studentCourseList() {
        return userCourseModule.studentCourseList;
    }

    get userRole() {
        return userModule.userData.role;
    }

    get userData() {
        return userModule.userData;
    }

    get userCourseListDisplayMode() {
        return userCourseModule.userCourseListDisplayMode;
    }
    handleGridClick() {
        userCourseModule.setUserCourseListDisplayMode(CourseListDisplayMode.GRID);
    }
    handleListClick() {
        userCourseModule.setUserCourseListDisplayMode(CourseListDisplayMode.LIST);
    }

    async initInstructorList() {
        commonModule.setLoadingIndicator(true);
        const response = await getInstructorList();
        if (response.success) {
            commonModule.setInstructorList(response?.data?.items || []);
        } else {
            let res = response?.errors || [
                { message: this.$t('landing.categories.errors.getCategoryListError') },
            ];
            commonModule.setInstructorList([]);
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }

    async getInstructorCourseList() {
        commonModule.setLoadingIndicator(true);
        const response = await getCourseList({
            pageSize: MAX_COURSE_GRID_ITEMS,
            instructorIds: this.userData.id,
        });
        if (response.success) {
            userCourseModule.setInstructorCourseList(response?.data?.items || []);
        } else {
            let res = response?.errors || [
                { message: this.$t('landing.categories.errors.getCategoryListError') },
            ];
            userCourseModule.setInstructorCourseList([]);
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }

    async getStudentCourseList() {
        commonModule.setLoadingIndicator(true);
        const response = await getStudentCourseList({
            pageSize: MAX_COURSE_GRID_ITEMS,
        });
        if (response.success) {
            userCourseModule.setStudentCourseList(response?.data || []);
        } else {
            let res = response?.errors || [
                { message: this.$t('landing.categories.errors.getCategoryListError') },
            ];
            userCourseModule.setStudentCourseList([]);
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }

    async initUserCourseListPage() {
        await this.initInstructorList();
        if (this.userData.role === SystemRole.INSTRUCTOR) {
            await this.getInstructorCourseList();
        }
        if (this.userData.role === SystemRole.STUDENT) {
            await this.getStudentCourseList();
        }
    }

    async created() {
        if (!localStorageTokenService.getAccessToken()) {
            this.$router.push({ name: PageName.LOGIN_PAGE });
        }
        await this.initUserCourseListPage();
    }
}
</script>
<style lang="scss" scoped>
.display-options {
    padding-bottom: 20px;
}

.active-display {
    background-color: $color-violet-new-1 !important;
}
.display-button {
    padding: 10px;
    background-color: $color-white;
    border-radius: 8px;
    width: 50px;
    height: 50px;
    cursor: pointer;
}
</style>