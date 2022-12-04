<template>
    <div class="d-flex flex-column w-100">
        <CoursePreviewInformation />
        <CoursePreviewTopic />
    </div>
</template>

<script lang="ts">
import { showErrorNotificationFunction } from '@/common/helpers';
import { commonModule } from '@/modules/common/store/common.store';
import { Options, Vue } from 'vue-class-component';
import { getCoursePreviewData } from '../../services/course';
import { courseModule } from '../../store/course.store';
import CoursePreviewInformation from './CoursePreviewInformation.vue';
import CoursePreviewTopic from './CoursePreviewTopic.vue';
import { getPriceBackgroundColor } from '../../helpers/commonFunctions';

@Options({
    components: { CoursePreviewInformation, CoursePreviewTopic },
})
export default class CourseRegistration extends Vue {
    async initCourseRegistration() {
        commonModule.setLoadingIndicator(true);
        const id: number = parseInt(this.$route.params.courseId as string);
        const response = await getCoursePreviewData(id);
        console.log(response);
        if (response.success) {
            courseModule.setCoursePreviewData(response?.data || {});
            console.log(courseModule.coursePreviewData);
            console.log('hihihii');
        } else {
            let res = response?.errors || [
                { message: this.$t('landing.categories.errors.getCategoryListError') },
            ];
            courseModule.setCoursePreviewData({});
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }

    created() {
        this.initCourseRegistration();
    }
}
</script>
<style lang="scss" scoped></style>
