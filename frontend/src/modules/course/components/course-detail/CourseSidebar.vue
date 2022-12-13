<template>
    <div class="course-sidebar-wrapper d-flex flex-column">
        <span
            class="sidebar-button"
            :style="{
                'background-color':
                    courseArea === CourseArea.COURSE ? '#6d79e8' : '#4057d0',
            }"
            @click="setCourseArea(CourseArea.COURSE)"
        >
            {{ $t('course.courseSidebar.courseDetail') }}
        </span>
        <span
            class="sidebar-button"
            :style="{
                'background-color':
                    courseArea === CourseArea.QUIZ ? '#6d79e8' : '#4057d0',
            }"
            @click="setCourseArea(CourseArea.QUIZ)"
        >
            {{ $t('course.courseSidebar.quiz') }}
        </span>
        <span
            v-if="userRole === SystemRole.INSTRUCTOR"
            @click="showStudentListPopup"
            class="sidebar-button"
        >
            {{ $t('course.courseSidebar.studentList') }}
        </span>
    </div>
</template>

<script lang="ts">
import { PageName, SystemRole } from '@/common/constants';
import localStorageTokenService from '@/common/tokenService';
import { commonModule } from '@/modules/common/store/common.store';
import { userModule } from '@/modules/user/store/user.store';
import { Options, Vue } from 'vue-class-component';
import { CourseArea } from '../../constants/course.constants';
import { courseModule } from '../../store/course.store';

@Options({
    components: {},
})
export default class CourseSidebar extends Vue {
    SystemRole = SystemRole;
    CourseArea = CourseArea;

    get isShowStudentListPopup() {
        return commonModule.isShowStudentListPopup;
    }

    get userRole() {
        return userModule.userData.role;
    }

    get courseArea() {
        return courseModule.courseArea;
    }

    showStudentListPopup() {
        commonModule.toggleShowStudentListPopup(true);
    }

    setCourseArea(area: string) {
        courseModule.setCourseArea(area);
    }
}
</script>
<style lang="scss" scoped>
.course-sidebar-wrapper {
    width: 240px;
    min-height: 169px;
    background-color: $color-violet-new;
}
.sidebar-button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    white-space: nowrap;
    padding: 12px 24px;
    transition: all 0.44s ease 0s;
    cursor: pointer;
    color: $color-white;
    &:hover {
        background-color: #5868d9 !important;
    }
}
</style>
