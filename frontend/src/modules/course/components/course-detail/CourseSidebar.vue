<template>
    <div class="course-sidebar-wrapper d-flex flex-column">
        <div
            class="sidebar-button collapse-toggle"
            style="background-color: #e6e6f0; height: 48px"
            :class="{ collapsed: isCollapsed }"
            @click="handleToggleSidebar"
        >
            <div v-if="!isCollapsed" class="d-flex justify-content-end w-100">
                <img src="@/assets/course/icons/collapse.png" width="24" alt="" />
            </div>

            <img v-else src="@/assets/course/icons/expand.png" width="24" alt="" />
        </div>
        <div
            class="sidebar-button"
            :class="{ collapsed: isCollapsed }"
            :style="{
                'background-color':
                    courseArea === CourseArea.COURSE ? '#6d79e8' : '#4057d0',
            }"
            @click="setCourseArea(CourseArea.COURSE)"
        >
            <div>
                <span v-if="!isCollapsed">{{
                    $t('course.courseSidebar.courseDetail')
                }}</span>
                <img
                    v-else
                    src="@/assets/course/icons/course-detail.png"
                    width="24"
                    alt=""
                />
            </div>
        </div>
        <div
            class="sidebar-button"
            :class="{ collapsed: isCollapsed }"
            :style="{
                'background-color':
                    courseArea === CourseArea.QUIZ ? '#6d79e8' : '#4057d0',
            }"
            @click="setCourseArea(CourseArea.QUIZ)"
        >
            <div>
                <span v-if="!isCollapsed"> {{ $t('course.courseSidebar.quiz') }}</span>
                <img v-else src="@/assets/course/icons/quiz.png" width="24" alt="" />
            </div>
        </div>
        <span
            v-if="userRole === SystemRole.INSTRUCTOR"
            @click="showStudentListPopup"
            :class="{ collapsed: isCollapsed }"
            class="sidebar-button"
        >
            <div>
                <span v-if="!isCollapsed">
                    {{ $t('course.courseSidebar.studentList') }}</span
                >
                <img
                    v-else
                    src="@/assets/course/icons/student-list.png"
                    width="24"
                    alt=""
                />
            </div>
        </span>
    </div>
</template>

<script lang="ts">
import { SystemRole } from '@/common/constants';
import { commonModule } from '@/modules/common/store/common.store';
import { userModule } from '@/modules/user/store/user.store';
import { Options, Vue } from 'vue-class-component';
import { CourseArea, SidebarMode } from '../../constants/course.constants';
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

    get courseSidebarMode() {
        return courseModule.courseSidebarMode;
    }

    get isCollapsed() {
        return this.courseSidebarMode === SidebarMode.COLLAPSED;
    }

    showStudentListPopup() {
        commonModule.toggleShowStudentListPopup(true);
    }

    setCourseArea(area: string) {
        courseModule.setCourseArea(area);
    }

    handleToggleSidebar() {
        if (this.courseSidebarMode === SidebarMode.EXPANDED) {
            courseModule.setCourseSidebarMode(SidebarMode.COLLAPSED);
        } else {
            courseModule.setCourseSidebarMode(SidebarMode.EXPANDED);
        }
    }

    created(): void {
        window.addEventListener('resize', this.showFullScreenOnMobile);
        this.showFullScreenOnMobile();
    }
    showFullScreenOnMobile() {
        if (document.documentElement.clientWidth <= 800) {
            courseModule.setCourseSidebarMode(SidebarMode.COLLAPSED);
        }
    }
}
</script>
<style lang="scss" scoped>
.course-sidebar-wrapper {
    min-height: 169px;
    background-color: $color-violet-new;
}
.sidebar-button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    white-space: nowrap;
    padding: 12px 24px;
    transition: 1s ease 0s;
    cursor: pointer;
    color: $color-white;
    &:hover {
        background-color: #5868d9 !important;
    }
}

.collapsed {
    display: flex;
    width: 60px;
    padding: 12px 0;
    justify-content: center !important;
}

.collapse-toggle {
    &:hover {
        background-color: #e6e6f0 !important;
    }
}
</style>
