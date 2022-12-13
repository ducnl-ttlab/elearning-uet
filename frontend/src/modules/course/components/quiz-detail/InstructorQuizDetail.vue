<template>
    <div class="quiz-detail-wrapper d-flex flex-column gap-4 w-100">
        <div v-if="quizList && quizList.length === 0">
            {{ $t('course.errors.emptyQuizList') }}
        </div>
        <div class="add-button d-flex flex-row gap-2">
            <img src="@/assets/course/icons/plus.svg" width="18" alt="" />
            <span>{{ $t('course.quiz.form.addQuiz') }}</span>
        </div>
        <div class="quiz-card" v-for="quiz in quizList" :key="quiz.id">
            <InstructorQuiz :quiz="quiz" />
        </div>
    </div>
</template>

<script lang="ts">
import { SystemRole } from '@/common/constants';
import { userModule } from '@/modules/user/store/user.store';
import { Options, Vue } from 'vue-class-component';
import { IQuizDetail } from '../../constants/course.interfaces';
import { courseModule } from '../../store/course.store';
import InstructorQuiz from '../quiz-detail/instructor/InstructorQuiz.vue';

@Options({
    components: { InstructorQuiz },
})
export default class InstructorQuizDetail extends Vue {
    SystemRole = SystemRole;

    get userRole() {
        return userModule.userData.role;
    }
    get selectedTopic() {
        return courseModule.selectedTopic;
    }

    get topicId() {
        return courseModule.topicId;
    }

    get quizList(): Array<IQuizDetail> {
        return courseModule.quizList;
    }
}
</script>
<style lang="scss" scoped>
.quiz-detail {
    &-wrapper {
        margin: 4vh 3vw;
    }
}

.edit-topic-button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    border-radius: 6px;
    padding: 8px 20px;
    transition: all 0.44s ease 0s;
    background-color: $color-violet-new-1;
    color: $color-white;
    cursor: pointer;
    &:hover {
        background-color: $color-violet-new-opacity-50;
    }
}

.add-button {
    cursor: pointer;
}

.text-ellipsis {
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}
</style>
