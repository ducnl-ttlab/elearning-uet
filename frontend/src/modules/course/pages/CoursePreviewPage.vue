<template>
    <CourseRegistration />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CourseRegistration from '../components/course-registration/CourseRegistration.vue';
import { userCourseModule } from '../store/user-course.store';

@Options({
    components: { CourseRegistration },
})
export default class CourseListPage extends Vue {
    get courseStatus() {
        return userCourseModule.userCourseData.status;
    }

    get isCourseOwner() {
        return false;
    }

    get isAdmitted() {
        return false;
    }
}
</script>
<style lang="scss" scoped></style>
