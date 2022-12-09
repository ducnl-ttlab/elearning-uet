<template>
    <div class="display-options d-flex flex-row gap-3">
        This is CourseDetail
        <span
            v-if="userRole === SystemRole.INSTRUCTOR"
            @click="showStudentListPopup"
            class="student-list-button"
        >
            {{ $t('course.courseDetail.showStudentList') }}
        </span>
        <CourseStudentList v-if="isShowStudentListPopup" />
    </div>
</template>

<script lang="ts">
import { PageName, SystemRole } from '@/common/constants';
import { showErrorNotificationFunction } from '@/common/helpers';
import localStorageTokenService from '@/common/tokenService';
import { commonModule } from '@/modules/common/store/common.store';
import { userModule } from '@/modules/user/store/user.store';
import { Options, Vue } from 'vue-class-component';
import { userCourseModule } from '../../store/user-course.store';
import CourseStudentList from './CourseStudentList.vue';

@Options({
    components: { CourseStudentList },
})
export default class CourseDetail extends Vue {
    SystemRole = SystemRole;

    get isShowStudentListPopup() {
        return commonModule.isShowStudentListPopup;
    }

    get userRole() {
        return userModule.userData.role;
    }

    showStudentListPopup() {
        commonModule.toggleShowStudentListPopup(true);
        console.log(this.isShowStudentListPopup);
    }

    async initCourseDetail() {
        console.log('init');
    }

    async created() {
        if (!localStorageTokenService.getAccessToken()) {
            this.$router.push({ name: PageName.LOGIN_PAGE });
        } else {
            this.initCourseDetail();
        }
    }
}
</script>
<style lang="scss" scoped>
.student-list-button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    border-radius: 8px;
    white-space: nowrap;
    padding: 12px 24px;
    transition: all 0.44s ease 0s;
    &:hover {
        color: $color-white;
        background-color: $color-violet-new-opacity-50;
        border: 1px solid $color-violet-new-opacity-50;
    }
}
</style>
