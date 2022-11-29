<template>
    <div class="main-body">
        <h1>{{ $t('homepage.category.title') }}</h1>
        <div class="course-box" :style="{ borderRadius: 12 }">
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
import { log } from 'console';
import { Options, Vue } from 'vue-class-component';
import { getCategoryPage } from '../services/category';
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

@Options({
    components: {},
})

export default class CategoryPage extends Vue {

     courses = [
      {
        "id": 1,
        "name": "IT và phần mềm",
        "image": "http://localhost:5000/category/image/software",
        "avgRating": 5,
        "courseTotal": 0,
        "studentTotal": 0
      }]

    async mounted() {   
        this.courses = (await getCategoryPage()).data.data.items;

        console.log(typeof this.courses);
    }

    goToCourse(id: number) {
        // this.$router.push({ name: 'course', params: { id } });
        console.log(id);
        throw new Error('Method not implemented.');
    }
}

// export default class CategoryPage extends Vue {

//     private store = useStore();

//     public courses = this.store.state.courses;

    
//     async mounted() {
//         const { data } = this.store.getters.getCourses;
//         this.courses.value = data;
//         console.log(data);
//     }

//     async  onMounted() {
//         this.store.dispatch('fetchcourses');
//     }

//     // private courses = computed(() => store.getters.getCourses);

//     async goToCourse(id: number) {
//         this.$router.push({ name: 'course', params: { id } });
//     }




// // baseRadius = computed(() => this.store.getters.getBaseRadius);
   
// }
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
