<template>
    <div class="">
        <el-dialog
            v-model="isShowStudentListPopup"
            :before-close="closeStudentListPopup"
            :title="$t('course.courseDetail.showStudentList')"
        >
            <el-input
                class="input keyword"
                style="width: 100%"
                :placeholder="$t('course.filters.keyword')"
                v-model="keyword"
                autocomplete="off"
                size="large"
            />
            <div class="student-list-wrapper d-flex flex-column pt-3">
                <div
                    class="student-card d-flex flex-row justify-content-between"
                    v-for="(student, index) in courseStudentList"
                    :key="student.id"
                >
                    <span class="student counter">{{ index + 1 }}</span>
                    <div class="student avatar">
                        <img :src="student.avatar" width="20" alt="" />
                    </div>
                    <span class="student username">{{ student.username }}</span>
                    <span class="student email">{{ student.email }}</span>
                    <span>{{ student.startCourseTime }}</span>
                    <div class="actions"></div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { showErrorNotificationFunction } from '@/common/helpers';
import { IGetListDefaultParams } from '@/common/interfaces';
import { commonModule } from '@/modules/common/store/common.store';
import { Options, Vue } from 'vue-class-component';
import {
    DEFAULT_SELECTED_PAGE,
    DEFAULT_STUDENT_COUNT_PER_PAGE,
} from '../../constants/course.constants';
import { getCourseStudentList } from '../../services/user-course';
import { userCourseModule } from '../../store/user-course.store';

@Options({
    components: {},
})
export default class CourseStudentList extends Vue {
    keyword = '';
    get isShowStudentListPopup() {
        return commonModule.isShowStudentListPopup;
    }

    get courseStudentList() {
        return userCourseModule.courseStudentList;
    }

    closeStudentListPopup() {
        commonModule.toggleShowStudentListPopup(false);
    }

    async initCourseStudentList() {
        const courseId = this.$route.params.courseId as string;
        commonModule.setLoadingIndicator(true);
        const params: IGetListDefaultParams = {
            keyword: (this.keyword && this.keyword) || undefined,
            page: DEFAULT_SELECTED_PAGE,
            pageSize: DEFAULT_STUDENT_COUNT_PER_PAGE,
        };
        const response = await getCourseStudentList(params, courseId);
        if (response?.success) {
            userCourseModule.setCourseStudentList(response?.data?.items || []);
        } else {
            let res = response?.errors || [
                { message: this.$t('landing.categories.errors.getCategoryListError') },
            ];
            userCourseModule.setCourseStudentList([]);
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }

    async created() {
        await this.initCourseStudentList();
        console.log(userCourseModule.courseStudentList);
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
</style>
