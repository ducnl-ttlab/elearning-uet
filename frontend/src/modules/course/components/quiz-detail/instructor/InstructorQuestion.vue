<template>
    <div class="question-card d-flex flex-row gap-4 pb-2">
        <span>{{ question.name }}</span>
        <span>{{ $t('course.quiz.form.mark', { mark: question.mark }) }}</span>
    </div>
    <div class="answer-wrapper px-3">
        <div
            class="answer-card d-flex flex-row gap-3"
            v-for="answer in question.answerList"
            :key="answer.id"
        >
            <InstructorAnswer :answer="answer" />
        </div>
        <div class="add-button d-flex flex-row gap-2 py-2">
            <img src="@/assets/course/icons/plus.svg" width="18" alt="" />
            <span>{{ $t('course.quiz.form.addAnswer') }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { SystemRole } from '@/common/constants';
import { userModule } from '@/modules/user/store/user.store';
import { IQuestionDetail, IQuizDetail } from '../../../constants/course.interfaces';
import { courseModule } from '../../../store/course.store';
import { Prop } from 'vue-property-decorator';
import InstructorAnswer from './InstructorAnswer.vue';

@Options({
    components: { InstructorAnswer },
})
export default class InstructorQuestion extends Vue {
    @Prop({ default: {} }) readonly question!: IQuestionDetail;
}
</script>

<style lang="scss" scoped>
.answer {
    &-wrapper {
        flex-wrap: wrap;
    }

    &-card {
        font-size: 16px;
        line-height: 200%;
    }
}
</style>
