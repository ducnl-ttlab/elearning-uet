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
                            <div class="card-total">
                                <div class="card-courseTotal">
                                    <span>{{ $t('homepage.category.courseTotal') }}{{ course.courseTotal }}</span>
                                </div>
                                <div class="card-studentTotal">
                                    <span>{{ $t('homepage.category.studentTotal') }}{{ course.studentTotal }}</span>
                                </div>
                            </div>
                            <el-rate class="card-avgRating" v-model="course.avgRating" disable show-score score-template="{value} points"
                                text-color="$color-yellow-01"></el-rate>
                        </div>
                    </el-card>
                </el-space>
            </el-space>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';


@Options({
    components: {},
})
export default class CategoryPage extends Vue {
    goToCourse(id: number) {
        console.log(id);
        this.$router.push({ name: 'course', params: { id } });
        
        throw new Error('Method not implemented.');
    }

    courses = [
      {
        "id": 1,
        "name": "IT và phần mềm",
        "image": "http://localhost:5000/category/image/software",
        "avgRating": 5,
        "courseTotal": 0,
        "studentTotal": 0
      },
      {
        "id": 2,
        "name": "Kinh doanh",
        "image": "http://localhost:5000/category/image/business",
        "avgRating": 5,
        "courseTotal": 1,
        "studentTotal": 2
      },
      {
        "id": 3,
        "name": "sáng tạo",
        "image": "http://localhost:5000/category/image/design",
        "avgRating": 5,
        "courseTotal": 2,
        "studentTotal": 4
      },
      {
        "id": 4,
        "name": "Phát triển bản thân",
        "image": "http://localhost:5000/category/image/personal-development",
        "avgRating": 5,
        "courseTotal": 3,
        "studentTotal": 6
      },
      {
        "id": 5,
        "name": "Kinh doanh",
        "image": "http://localhost:5000/category/image/marketing",
        "avgRating": 5,
        "courseTotal": 4,
        "studentTotal": 8
      },
      {
        "id": 6,
        "name": "Lập trình",
        "image": "http://localhost:5000/category/image/development",
        "avgRating": 5,
        "courseTotal": 5,
        "studentTotal": 10
      },
      {
        "id": 7,
        "name": "Nghệ thuật",
        "image": "http://localhost:5000/category/image/music",
        "avgRating": 5,
        "courseTotal": 6,
        "studentTotal": 12
      },
      {
        "id": 8,
        "name": "Nhiếp ảnh",
        "image": "http://localhost:5000/category/image/photography",
        "avgRating": 5,
        "courseTotal": 7,
        "studentTotal": 14
      }
    ];

    baseRadius = "var(--el-border-radius-base)";
}
</script>

<style lang="scss" scoped>


.main-body {
    height: 80vh;
    font-display: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

body h1 {
    font-size: 2.5em;
    font-weight: 600;
    text-align: center;
    margin-top: 2%;
}

.card-total {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.card-total span {
    font-size: 13px;
}

.courseCard {
    border-radius: 10px;
    cursor: pointer;
}

.card-title {
    font-size: 20px;
    font-weight: 700;
}

.el-rate {
    align-items: normal;
    font-size: 12px;
    cursor: default;

}

@media screen and (max-width: 770px) {
    .main-body {
        height: unset;
    }
}
</style>
