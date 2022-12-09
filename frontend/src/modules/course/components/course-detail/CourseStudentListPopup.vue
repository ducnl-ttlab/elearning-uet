<template>
    <div class="">
        <el-dialog
            v-model="isShowStudentListPopup"
            :before-close="closeStudentListPopup"
            :title="
                studentListMode === StudentListMode.INSIDE
                    ? $t('course.courseDetail.showStudentList')
                    : $t('course.courseDetail.showOutsideStudentList')
            "
        >
            <div class="d-flex flex-row pb-4">
                <div
                    class="option-button"
                    :class="{
                        'option-button-active':
                            studentListMode === StudentListMode.INSIDE ? true : false,
                    }"
                    @click="handleChangeStudentListMode(StudentListMode.INSIDE)"
                >
                    {{ $t('course.studentListMode.inside') }}
                </div>
                <div
                    class="option-button"
                    @click="handleChangeStudentListMode(StudentListMode.INSIDE)"
                >
                    {{ $t('course.studentListMode.outside') }}
                </div>
            </div>
            <CourseStudentList v-if="studentListMode === StudentListMode.INSIDE" />
            <OutsideCourseStudentList
                v-if="studentListMode === StudentListMode.OUTSIDE"
            />
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { commonModule } from '@/modules/common/store/common.store';
import { Options, Vue } from 'vue-class-component';
import { StudentListMode } from '../../constants/course.constants';
import { userCourseModule } from '../../store/user-course.store';
import CourseStudentList from './CourseStudentList.vue';
import OutsideCourseStudentList from './OutsideCourseStudentList.vue';

@Options({
    components: { CourseStudentList, OutsideCourseStudentList },
})
export default class CourseStudentListPopup extends Vue {
    StudentListMode = StudentListMode;
    get studentListMode() {
        return userCourseModule.studentListMode;
    }

    get isShowStudentListPopup() {
        return commonModule.isShowStudentListPopup;
    }

    handleChangeStudentListMode(mode: string) {
        userCourseModule.setStudentListMode(mode);
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

.student-list-wrapper {
    gap: 12px;
}

.student-card {
    padding: 12px 18px;
    border-radius: 6px;
    border: 1px solid red;
}
.action {
    cursor: pointer;
    color: red;
}

.username {
    width: 25%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.email {
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.rejected-student {
    text-decoration: line-through;
    background-color: #ff9a9a;
}

.option-button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    border-radius: 6px;
    white-space: nowrap;
    padding: 8px 20px;
    transition: all 0.44s ease 0s;
    background-color: $color-white;
    border: 1px solid transparent;
    color: #000;
    cursor: pointer;
    &-active {
        color: $color-white;
        background-color: $color-violet-new-opacity-50;
        border: 1px solid $color-violet-new-opacity-50;
    }
}
</style>
