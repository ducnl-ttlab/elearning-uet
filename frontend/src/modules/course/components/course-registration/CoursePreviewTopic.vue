<template>
    <div class="pb-4">
        <div class="course-p-title">{{ $t('course.preview.content') }}</div>
        <div class="course-p-topic d-flex flex-column">
            <div
                class="course-p-topic-detail"
                v-for="topic in coursePreviewTopicList"
                :key="topic.id"
            >
                <div class="course-p-topic-title">
                    {{ topic.name }}
                </div>
                <div class="course-p-topic-description">
                    {{ topic.description }}
                </div>
            </div>
        </div>
        <BaseNoResult
            v-if="coursePreviewTopicList?.length === 0"
            :message="$t('course.errors.emptyTopicList')"
        />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { courseModule } from '../../store/course.store';

@Options({
    components: {},
})
export default class CoursePreviewTopic extends Vue {
    get coursePreviewTopicList() {
        return courseModule.coursePreviewData.topics;
    }
}
</script>
<style lang="scss" scoped>
.course-p-title {
    padding: 30px 9px 6px;
    font-size: 27px;
    font-weight: 600;
}

.course-p-topic {
    padding-top: 30px;

    &-detail {
        background-color: $color-violet-new-1-filter;
    }

    &-title {
        border-left: 4px solid $color-violet-new;
        padding: 5px 12px;
        background-color: $color-violet-new-1-opacity-30;
        font-size: 20px;
        font-weight: 600;
    }

    &-description {
        padding: 12px 2vw 25px;
        background-color: $color-white-opacity-30;
        font-size: 16px;
    }
}
</style>
