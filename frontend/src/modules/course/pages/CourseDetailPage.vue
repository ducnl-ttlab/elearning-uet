<template>
    <CourseRegistration v-if="!isAdmitted" />
    <CourseDetail v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CourseRegistration from '../components/course-registration/CourseRegistration.vue';
import CourseDetail from '../components/course-detail/CourseDetail.vue';

@Options({
    components: { CourseDetail, CourseRegistration },
})
export default class CourseListPage extends Vue {
    get isAdmitted() {
        return false;
    }
}
</script>
<style lang="scss" scoped></style>
