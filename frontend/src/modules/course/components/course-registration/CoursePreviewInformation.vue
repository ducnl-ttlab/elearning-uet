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
            <div class="course-p-price d-flex flex-row">
                <div
                    v-if="coursePreviewInformation?.price"
                    style="width: 80%"
                    :style="{
                        'background-color': getPriceBackgroundColor(
                            coursePreviewInformation?.price,
                        ),
                        width: coursePreviewInformation?.price ? '80%' : '100%',
                    }"
                >
                    {{
                        $t('course.course.price', {
                            price: coursePreviewInformation?.price,
                        })
                    }}
                </div>
                <div v-else style="background-color: #3bb143; width: 100%">
                    {{ $t('course.course.free') }}
                </div>
                <div
                    v-if="coursePreviewInformation?.price"
                    class="course-p-cart"
                    style="width: 20%; background-color: #ffae42"
                    @click="handleAddToCart"
                >
                    <img
                        src="@/assets/common/icons/header/header-cart.svg"
                        width="25"
                        alt=""
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { getPriceBackgroundColor } from '../../helpers/commonFunctions';
import { courseModule } from '../../store/course.store';

@Options({
    components: {},
})
export default class CoursePreviewTopic extends Vue {
    get coursePreviewInformation() {
        return courseModule.coursePreviewData.course;
    }

    getPriceBackgroundColor(price: number) {
        return getPriceBackgroundColor(price);
    }

    handleAccessCourse() {
        //call API accessCourse
    }

    handleAddToCart() {
        //call API AddToCart
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
    &-price {
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
