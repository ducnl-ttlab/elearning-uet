<template>
    <div class="course-grid-wrapper w-100 d-flex flex-row justify-content-between">
        <CourseGridItem v-for="course in courseList" :key="course.id" :course="course" />
        <div class="filler"></div>
        <div class="filler"></div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { showErrorNotificationFunction } from '@/common/helpers';
import CourseGridItem from './CourseGridItem.vue';
import { courseModule } from '../store/course.store';
import { getCourseList } from '../services/course';
import { MAX_COURSE_GRID_ITEMS } from '../constants/course.constants';
import { commonModule } from '@/common/store/common.store';

@Options({
    components: { CourseGridItem },
})
export default class CourseGrid extends Vue {
    get courseList() {
        return courseModule.courseList;
    }

    async getCourseList() {
        commonModule.setLoadingIndicator(true);
        const id: number = parseInt(this.$route.params.id as string);
        const response = await getCourseList({
            pageSize: MAX_COURSE_GRID_ITEMS,
            categoryId: id,
        });
        if (response.success) {
            courseModule.setCourseList(response?.data?.items || []);
        } else {
            let res = response?.errors || [
                { message: this.$t('landing.categories.errors.getCategoryListError') },
            ];
            courseModule.setCourseList([]);
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }

    async created() {
        window.scrollTo(0, 0);
        await this.getCourseList();
        console.log(this.courseList, 'courseList');
    }
}
</script>
<style lang="scss" scoped>
.course-grid-wrapper {
    flex-wrap: wrap;
    gap: 24px;
}

.filler {
    width: 374px;
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: md)) {
}
</style>
