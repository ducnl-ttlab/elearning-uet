<template>
    <CourseDetail />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CourseDetail from '../components/course-detail/CourseDetail.vue';
import { CourseArea, SidebarMode } from '../constants/course.constants';
import { courseModule } from '../store/course.store';

@Options({
    components: { CourseDetail },
})
export default class CourseListPage extends Vue {
    get isCourseOwner() {
        return false;
    }

    get isAdmitted() {
        return false;
    }

    created() {
        courseModule.setTopicSidebarMode(SidebarMode.COLLAPSED);
        courseModule.setQuizSidebarMode(SidebarMode.COLLAPSED);
        courseModule.setCourseArea(CourseArea.COURSE);
    }
}
</script>
<style lang="scss" scoped></style>
