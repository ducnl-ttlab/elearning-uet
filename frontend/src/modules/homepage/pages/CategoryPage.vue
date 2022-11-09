<template>
    <div class="main-body">
        <h1>{{ $t('homepage.category.title') }}</h1>

        <div class="course-box" :style="{ borderRadius: baseRadius }">
            <el-space direction="vertical" alignment="start" :size="30" style="margin-top: 2%; margin-left: 10%">
                <!-- START OF SINGLE CARD -->
                <el-space v-if="courses.length" wrap size="large">
                    <el-card class="courseCard" :body-style="{ padding: '0px' }" shadow="hover"
                        style="margin-bottom: 13px" v-for="course in courses" :key="course.id"
                        @click="goToCourse(course.id)">
                        <img :src="course.image" class="product-img" :alt="course.name" />
                        <div style="padding: 14px">
                            <div class="card-title">{{ course.name }}</div>
                            <div>
                                <div class="card-courseTotal">
                                    <span>{{ $t('homepage.category.courseTotal') }}{{ course.courseTotal }}</span>
                                </div>
                                <div class="card-studentTotal">
                                    <span>{{ $t('homepage.category.studentTotal') }}{{ course.studentTotal }}</span>
                                </div>
                            </div>

                            <!-- rating from users -->
                            <el-rate v-model="course.avgRating" disable show-score text-color="#ff9900"></el-rate>

                        </div>
                    </el-card>
                </el-space>
            </el-space>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { homepage } from '../locale/vi/homepage.vi';
import { CategoryState } from '../store/category/types';

@Options({
    components: {},
})
export default class CategoryPage extends Vue {
[x: string]: any;
    goToCourse(id: number) {
        throw new Error('Method not implemented.');
    }

    courses = [
        {
            id: 1,
            name: 'Java',
            image: 'https://i.imgur.com/9ZQZ9Zu.jpg',
            courseTotal: 10,
            studentTotal: 100,
            avgRating: 4.5,

        }
    ];



    baseRadius = "var(--el-border-radius-base)";
}
</script>

<style lang="scss" scoped>
.underscore {
    padding-bottom: 0.5em;
    border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
}

.main-body {
    height: 80vh;
}

.card-title {
    font-size: 20px;
    font-weight: 700;
}

@media screen and (max-width: 770px) {
    .main-body {
        height: unset;
    }
}
</style>
