<template>
    <div class="display-options d-flex flex-row gap-3">
        <img
            @click="handleGridClick()"
            src="@/assets/course/icons/display-grid.png"
            :class="{
                'active-display': courseListDisplayMode === CourseListDisplayMode.GRID,
            }"
            alt=""
            class="display-button"
        />
        <img
            @click="handleListClick()"
            src="@/assets/course/icons/display-list.png"
            alt=""
            :class="{
                'active-display': courseListDisplayMode === CourseListDisplayMode.LIST,
            }"
            class="display-button"
        />
    </div>
    <div class="course-list-page-wrapper">
        <CourseGrid v-if="courseListDisplayMode === CourseListDisplayMode.GRID" />
        <CourseList v-if="courseListDisplayMode === CourseListDisplayMode.LIST" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CourseGrid from '../components/CourseGrid.vue';
import CourseList from '../components/CourseList.vue';
import { CourseListDisplayMode } from '../constants/course.constants';
import { courseModule } from '../store/course.store';

@Options({
    components: { CourseGrid, CourseList },
})
export default class CourseListPage extends Vue {
    CourseListDisplayMode = CourseListDisplayMode;
    get courseListDisplayMode() {
        return courseModule.courseListDisplayMode;
    }
    handleGridClick() {
        courseModule.setCourseListDisplayMode(CourseListDisplayMode.GRID);
    }
    handleListClick() {
        courseModule.setCourseListDisplayMode(CourseListDisplayMode.LIST);
    }
}
</script>
<style lang="scss" scoped>
.display-options {
    padding-bottom: 20px;
}

.active-display {
    background-color: $color-violet-new-1 !important;
}
.display-button {
    padding: 10px;
    background-color: $color-white;
    border-radius: 8px;
    width: 50px;
    height: 50px;
    cursor: pointer;
}
</style>