<template>
    <div class="d-flex flex-row gap-4 mb-3 quiz-title">
        <div class="quiz-name text-ellipsis">{{ quiz.name }}</div>
        <div class="quiz-duration">
            {{ $t('course.quiz.form.duration', { time: quiz.duration }) }}
        </div>
    </div>
    <div class="question-wrapper d-flex flex-column gap-3">
        <div class="add-button d-flex flex-row gap-2">
            <img src="@/assets/course/icons/plus.svg" width="18" alt="" />
            <div @click="handleAddQuestion">{{ $t('course.quiz.form.addQuestion') }}</div>
        </div>
        <div v-for="question in quiz.questionList" :key="question.id">
            <InstructorQuestion :question="question" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { SystemRole } from '@/common/constants';
import { userModule } from '@/modules/user/store/user.store';
import { IQuizDetail } from '../../../constants/course.interfaces';
import { Prop } from 'vue-property-decorator';
import InstructorQuestion from './InstructorQuestion.vue';

@Options({
    components: { InstructorQuestion },
})
export default class InstructorQuiz extends Vue {
    @Prop({ default: {} }) readonly quiz!: IQuizDetail;
}
</script>

<style lang="scss" scoped>
.quiz {
    &-title {
        border-left: 3px solid #c4c4c4;
        padding: 8px 12px;
        text-align: center;
        align-items: center;
        background-color: #f2f2f2;
    }

    &-name {
        font-size: 22px;
        font-weight: 600;
        max-width: 70%;
    }

    &-duration {
        font-size: 15px;
        font-weight: 600;
    }
}

.question {
    &-wrapper {
        padding-left: 24px;
    }
}
</style>
