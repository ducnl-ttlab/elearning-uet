<template>
    <div class="course-detail-wrapper d-flex flex-column w-100">
        <CourseGeneralInfo />
        <div class="course-detail d-flex flex-row">
            <CourseSidebar />
            <div class="d-flex flex-row w-100">
                <TopicSidebar />
                <TopicDetail :topic="topic" />
            </div>
        </div>
        <CourseStudentListPopup v-if="isShowStudentListPopup" />
    </div>
</template>

<script lang="ts">
import localStorageTokenService from '@/common/tokenService';
import { PageName, SystemRole } from '@/common/constants';
import { commonModule } from '@/modules/common/store/common.store';
import { userModule } from '@/modules/user/store/user.store';
import { Options, Vue } from 'vue-class-component';
import CourseStudentListPopup from './CourseStudentListPopup.vue';
import CourseSidebar from './CourseSidebar.vue';
import TopicSidebar from './TopicSidebar.vue';
import TopicDetail from './TopicDetail.vue';
import CourseGeneralInfo from './CourseGeneralInfo.vue';
import { courseModule } from '../../store/course.store';
import { getCoursePreviewData, getTopicList } from '../../services/course';
import { showErrorNotificationFunction } from '@/common/helpers';

@Options({
    components: {
        CourseSidebar,
        CourseStudentListPopup,
        TopicSidebar,
        TopicDetail,
        CourseGeneralInfo,
    },
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

    async getCourseGeneralInfo() {
        const id: number = parseInt(this.$route.params.courseId as string);
        const response = await getCoursePreviewData(id);
        if (response?.success) {
            courseModule.setCoursePreviewData(response?.data || {});
        } else {
            let res = response?.errors || [
                { message: this.$t('landing.categories.errors.getCategoryListError') },
            ];
            courseModule.setCoursePreviewData({});
            showErrorNotificationFunction(res[0].message);
        }
    }

    async getTopicList() {
        const id: number = parseInt(this.$route.params.courseId as string);
        const response = await getTopicList(id);
        if (response.success) {
            courseModule.setTopicList(response?.data?.items || []);
            if (response?.data?.items && response?.data?.items.length > 0) {
                courseModule.setSelectedTopic(1);
            } else {
                courseModule.setSelectedTopicObject({});
            }
        } else {
            let res = response?.errors || [
                { message: this.$t('course.errors.getTopicListError') },
            ];
            courseModule.setTopicList([]);
            showErrorNotificationFunction(res[0].message);
        }
    }

    async initCourseDetail() {
        commonModule.setLoadingIndicator(true);
        await this.getCourseGeneralInfo();
        await this.getTopicList();
        commonModule.setLoadingIndicator(false);
    }

    async created() {
        if (!localStorageTokenService.getAccessToken()) {
            this.$router.push({ name: PageName.LOGIN_PAGE });
        } else {
            await this.initCourseDetail();
        }
    }
}
</script>
<style lang="scss" scoped></style>
