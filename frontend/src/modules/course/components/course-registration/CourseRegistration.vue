<template>
    <div class="d-flex flex-column w-100">
        <CoursePreviewInformation @reload-course-status="getUserCourseData" />
        <CoursePreviewTopic />
    </div>
</template>

<script lang="ts">
import { showErrorNotificationFunction } from '@/common/helpers';
import { commonModule } from '@/modules/common/store/common.store';
import { Options, Vue } from 'vue-class-component';
import { getCoursePreviewData } from '../../services/course';
import { courseModule } from '../../store/course.store';
import { userCourseModule } from '../../store/user-course.store';
import { getUserCourseData } from '../../services/user-course';
import CoursePreviewInformation from './CoursePreviewInformation.vue';
import CoursePreviewTopic from './CoursePreviewTopic.vue';

@Options({
    components: { CoursePreviewInformation, CoursePreviewTopic },
})
export default class CourseRegistration extends Vue {
    async initCourseRegistration() {
        commonModule.setLoadingIndicator(true);
        const id: number = +this.$route.params.courseId;
        const response = await getCoursePreviewData(id);
        console.log(response);
        if (response.success) {
            courseModule.setCoursePreviewData(response?.data || {});
        } else {
            let res = response?.errors || [
                { message: this.$t('course.errors.getCoursePreviewError') },
            ];
            courseModule.setCoursePreviewData({});
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }

    async getUserCourseData() {
        commonModule.setLoadingIndicator(true);
        const id: number = +this.$route.params.courseId;
        const response = await getUserCourseData(id);
        if (response.success) {
            userCourseModule.setUserCourseData(response?.data || {});
        } else {
            let res = response?.errors || [
                { message: this.$t('course.errors.userCourseDataError') },
            ];
            userCourseModule.setUserCourseData({});
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }

    async created() {
        await this.initCourseRegistration();
        await this.getUserCourseData();
    }
}
</script>
<style lang="scss" scoped></style>
