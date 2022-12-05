<template>
    <div class="course-p-information d-flex flex-column flex-xl-row w-100">
        <div class="course-p-information-left d-flex flex-column w-100">
            <div class="course-p-title text-ellipsis">
                {{ coursePreviewInformation?.name }}
            </div>
            <div class="course-p-description text-ellipsis">
                {{ coursePreviewInformation?.description }}
            </div>
            <div class="course-p-rating d-flex flex-row pt-3">
                <div v-if="coursePreviewInformation?.avgRating">
                    {{ $t('course.course.rating') }}
                </div>
                <div>
                    <span>{{
                        Math.round(coursePreviewInformation?.avgRating * 100) / 100 ||
                        $t('course.course.notRated')
                    }}</span>
                    <img
                        class="mx-1 mb-1"
                        v-if="coursePreviewInformation?.avgRating"
                        src="@/assets/landing/icons/star.svg"
                        width="16"
                        alt=""
                    />
                </div>
            </div>
            <div class="course-p-infos d-flex flex-row justify-content-between pt-3">
                <div class="course-p-instructor">
                    <span>{{
                        $t('course.course.instructor', {
                            instructor: coursePreviewInformation?.username,
                        })
                    }}</span>
                </div>
                <div class="course-p-studentTotal">
                    <span style="padding-right: 2px">
                        {{
                            $t('course.course.studentTotal', {
                                studentTotal: coursePreviewInformation?.studentTotal || 0,
                            })
                        }}
                    </span>
                    <img src="@/assets/common/images/user.svg" width="20" alt="" />
                </div>
            </div>
        </div>
        <div
            class="course-p-information-right d-flex flex-column align-items-center"
            @click="handleAccessCourse"
        >
            <div class="course-p-image">
                <img :src="coursePreviewInformation?.image" alt="" />
            </div>
            <div class="course-p-action d-flex flex-row">
                <div v-if="actionButton === 0" style="width: 80%">
                    <div
                        v-if="coursePreviewInformation?.price"
                        :style="{
                            'background-color': getPriceBackgroundColor(
                                coursePreviewInformation?.price,
                            ),
                        }"
                    >
                        {{
                            $t('course.course.price', {
                                price: coursePreviewInformation?.price,
                            })
                        }}
                    </div>
                    <div v-else style="background-color: #3bb143">
                        {{ $t('course.course.free') }}
                    </div>
                </div>
                <div v-if="actionButton === 1" style="width: 80%">
                    <div style="background-color: #3bb143">
                        {{ $t('course.course.goToCourse') }}
                    </div>
                </div>
                <div v-if="actionButton === 2" style="width: 80%">
                    <div style="background-color: #f9f9f9">
                        {{ $t('course.course.notOwnedCourse') }}
                    </div>
                </div>
                <div v-if="actionButton === 3" style="width: 80%">
                    <div style="background-color: #f9f9f9">
                        {{ $t('course.course.rejectedCourse') }}
                    </div>
                </div>
                <div v-if="actionButton === 4" style="width: 80%">
                    <div style="background-color: #f9f9f9">
                        {{ $t('course.course.pendingCourse') }}
                    </div>
                </div>
                <div v-if="actionButton === 5" style="width: 80%">
                    <div style="background-color: #3bb143">
                        {{ $t('course.course.expiredCourse') }}
                    </div>
                </div>
                <div
                    class="course-p-favorite"
                    style="width: 20%; background-color: #fff"
                    @click="handleToggleFavorite"
                >
                    <img src="@/assets/course/icons/heart.svg" width="25" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PageName } from '@/common/constants';
import { showErrorNotificationFunction } from '@/common/helpers';
import { loginModule } from '@/modules/auth/store/login.store';
import { commonModule } from '@/modules/common/store/common.store';
import { Options, Vue } from 'vue-class-component';
import { UserCourseStatus } from '../../constants/course.constants';
import { getPriceBackgroundColor } from '../../helpers/commonFunctions';
import { toggleCourseFavorite } from '../../services/user-course';
import { courseModule } from '../../store/course.store';
import { userCourseModule } from '../../store/user-course.store';

@Options({
    components: {},
})
export default class CoursePreviewTopic extends Vue {
    get coursePreviewInformation() {
        return courseModule.coursePreviewData?.course;
    }

    get userCourseData() {
        return userCourseModule.userCourseData;
    }

    get isCourseOwner() {
        return false;
    }

    get actionButton() {
        switch (userCourseModule.userCourseData.status) {
            case UserCourseStatus.STUDENT:
            case UserCourseStatus.GUEST:
                return 0;
            case UserCourseStatus.ADMIN:
            case UserCourseStatus.ACCEPTED:
            case UserCourseStatus.COMMENT_BLOCKED:
                return 1;
            case UserCourseStatus.INSTRUCTOR:
                if (this.isCourseOwner) return 1;
                else return 2;
            case UserCourseStatus.REJECTED:
                return 3;
            case UserCourseStatus.EXPIRED:
                return 4;
            case UserCourseStatus.PENDING:
                return 5;
            default:
                return 0;
        }
    }

    handleAction() {
        console.log(1);
    }

    getPriceBackgroundColor(price: number) {
        return getPriceBackgroundColor(price);
    }

    handleAccessCourse() {
        //call API accessCourse
    }

    async handleToggleFavorite() {
        if (!loginModule.accessToken) {
            this.$router.push({ name: PageName.LOGIN_PAGE });
        } else {
            commonModule.setLoadingIndicator(true);
            const id: number = parseInt(this.$route.params.courseId as string);
            const response = await toggleCourseFavorite(id);
            if (response.success) {
                userCourseModule.setFavoriteCourse(response?.data?.favorite || false);
            } else {
                let res = response?.errors || [
                    {
                        message: this.$t(
                            'landing.categories.errors.getCategoryListError',
                        ),
                    },
                ];
                userCourseModule.setFavoriteCourse(
                    this.userCourseData?.favorite || false,
                );
                showErrorNotificationFunction(res[0].message);
            }
            commonModule.setLoadingIndicator(false);
        }
    }
}
</script>
<style lang="scss" scoped>
.course-p-information {
    padding: 5vh 5vw;
    gap: 5vw;
    border: 1px solid red;
    border-radius: 12px;
    justify-content: space-between;
    background-color: #1b2838;
    color: $color-white;
}

.course-p {
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

.text-ellipsis {
    max-width: 80%;
    display: block;
    display: -webkit-box;
    line-height: 150%;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: xl)) {
    .course-p {
        &-image {
            img {
                width: 50vw;
            }
        }
        &-title {
            font-size: 24px;
            font-weight: 600;
            height: 72px;
        }

        &-description {
            font-size: 16px;
            font-weight: 500;
            height: 48px;
        }

        &-price {
            width: 50vw !important;
        }

        &-infos {
            width: 100%;
        }
    }
    .text-ellipsis {
        max-width: 100% !important;
        display: block;
        display: -webkit-box;
        line-height: 150%;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>
