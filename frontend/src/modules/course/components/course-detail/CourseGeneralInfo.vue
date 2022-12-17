<template>
    <div class="course-information d-flex flex-column flex-xl-row w-100">
        <div class="course-info-information-left d-flex flex-column w-100">
            <div class="course-info-title text-ellipsis">
                {{ courseInfo?.name }}
            </div>
            <div class="course-info-description text-ellipsis">
                {{ courseInfo?.description }}
            </div>
            <div class="course-info-rating d-flex flex-row pt-3">
                <div v-if="courseInfo?.avgRating">
                    {{ $t('course.course.rating') }}
                </div>
                <div v-if="userRole === SystemRole.INSTRUCTOR">
                    <span>{{
                        Math.round(courseInfo?.avgRating * 100) / 100 ||
                        $t('course.course.notRated')
                    }}</span>
                    <img
                        class="mx-1 mb-1"
                        v-if="courseInfo?.avgRating"
                        src="@/assets/landing/icons/star.svg"
                        width="16"
                        alt=""
                    />
                </div>
                <div class="d-flex flex-row" v-if="userRole === SystemRole.STUDENT">
                    <div v-for="index in 5" :key="index">
                        <img
                            @click="rateCourse(index)"
                            class="mb-1"
                            style="color: white; cursor: pointer"
                            src="@/assets/landing/icons/star.svg"
                            width="16"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="course-info-infos d-flex flex-row justify-content-between pt-3">
                <div class="course-info-instructor">
                    <span>{{
                        $t('course.course.instructor', {
                            instructor: courseInfo?.username,
                        })
                    }}</span>
                </div>
                <div class="course-info-studentTotal">
                    <span style="padding-right: 2px">
                        {{
                            $t('course.course.studentTotal', {
                                studentTotal: courseInfo?.studentTotal || 0,
                            })
                        }}
                    </span>
                    <img src="@/assets/common/images/user.svg" width="20" alt="" />
                </div>
            </div>
        </div>
        <div class="course-info-information-right d-flex flex-column align-items-center">
            <div class="course-info-image">
                <img :src="courseInfo?.image" alt="" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PageName, SystemRole } from '@/common/constants';
import { showErrorNotificationFunction } from '@/common/helpers';
import localStorageTokenService from '@/common/tokenService';
import { userModule } from '@/modules/user/store/user.store';
import { Options, Vue } from 'vue-class-component';
import { rateCourse } from '../../services/course';
import { courseModule } from '../../store/course.store';
import { userCourseModule } from '../../store/user-course.store';

@Options({
    components: {},
})
export default class CourseGeneralInfo extends Vue {
    get courseInfo() {
        return courseModule.coursePreviewData?.course;
    }

    SystemRole = SystemRole;
    get userRole() {
        return userModule.userData.role;
    }

    get courseRating() {
        return userCourseModule.userCourseData.rating;
    }

    created() {
        if (!localStorageTokenService.getAccessToken()) {
            this.$router.push({ name: PageName.LOGIN_PAGE });
        }
    }

    async rateCourse(rating: number) {
        const id: number = parseInt(this.$route.params.courseId as string);
        const response = await rateCourse(id, rating + '');
        if (response?.success) {
            // courseModule.setCourseRating(response?.data || {});
        } else {
            let res = response?.errors || [
                { message: this.$t('landing.categories.errors.getCategoryListError') },
            ];
            // courseModule.setCourseRating(0);
            showErrorNotificationFunction(res[0].message);
        }
    }
}
</script>
<style lang="scss" scoped>
.course-information {
    padding: 6vh 10vw;
    gap: 5vw;
    justify-content: space-between;
    background-color: #1b2838;
    color: $color-white;
}

.course-info {
    &-title {
        font-size: 27px;
        font-weight: 600;
        height: 122px;
    }

    &-description {
        font-size: 18px;
        font-weight: 500;
        height: 81px;
    }

    &-image {
        img {
            width: 30vw;
            aspect-ratio: 16 / 9;
        }
    }
    &-infos {
        width: 80%;
    }
    &-action {
        text-align: center;
        width: 100%;
        line-height: 40px;
        cursor: pointer;
    }
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: xl)) {
    .course-info-image {
        img {
            width: 70vw;
        }
    }

    .course-information {
        gap: 30px;
    }
}
</style>
