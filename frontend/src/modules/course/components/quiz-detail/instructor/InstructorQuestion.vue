<template>
    <div class="question-card d-flex flex-row gap-3 pb-2">
        <div v-if="!isEditingQuestion" class="d-flex flex-row gap-4">
            <span>{{ question?.name }}</span>
            <span>{{ $t('course.quiz.form.mark', { mark: question?.mark }) }}</span>
        </div>

        <div v-else class="question-card d-flex flex-row gap-4 pb-2">
            <el-input
                :placeholder="$t('course.quiz.form.title')"
                v-model.trim="question.name"
                @change="toggleEditQuestion"
                autocomplete="off"
            />
            <el-input
                :placeholder="$t('course.quiz.form.title')"
                v-model.number="question.mark"
                @change="toggleEditQuestion"
                autocomplete="off"
            />
        </div>
        <div class="d-flex flex-row gap-2" style="padding-left: 10px">
            <img
                src="@/assets/course/icons/edit.svg"
                width="16"
                alt=""
                style="cursor: pointer"
                @click="toggleEditQuestion"
            />
            <img
                v-if="!isEditingQuestion"
                src="@/assets/course/icons/cancel.svg"
                width="16"
                alt=""
                style="cursor: pointer"
                @click="handleDeleteQuestion"
            />
        </div>
    </div>
    <div class="answer-wrapper px-3">
        <div
            class="answer-card d-flex flex-row gap-3"
            v-for="(answer, index) in question?.answerList"
            :key="index"
        >
            <InstructorAnswer :answer="answer" :index="index" />
        </div>
        <div class="add-button d-flex flex-row gap-2 py-2">
            <img src="@/assets/course/icons/plus.svg" width="18" alt="" />
            <div @click="handleAddAnswer(question?.id)" style="cursor: pointer">
                {{ $t('course.quiz.form.addAnswer') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { IQuestionDetail } from '../../../constants/course.interfaces';
import { Prop } from 'vue-property-decorator';
import InstructorAnswer from './InstructorAnswer.vue';
import { courseModule } from '@/modules/course/store/course.store';

@Options({
    components: { InstructorAnswer },
})
export default class InstructorQuestion extends Vue {
    @Prop({ default: {} }) readonly question!: IQuestionDetail;
    isEditingQuestion = false;

    newAnswer = {
        content: 'Thêm câu hỏi' as string,
        isCorrect: false,
    };

    handleAddAnswer(questionId: number) {
        let newQuizList = courseModule.quizList.map((item) => {
            let { questionList } = item;

            questionList = questionList?.map((questionItem) => {
                let { answerList } = questionItem;
                if (questionId === questionItem.id) {
                    answerList?.push(this.newAnswer);
                }

                answerList = answerList?.map((answerItem) => {
                    return {
                        ...answerItem,
                        questionId,
                    };
                });

                return {
                    ...questionItem,
                    answerList,
                };
            });
            return {
                ...item,
                questionList,
            };
        });
        courseModule.setQuizList(newQuizList);
    }

    toggleEditQuestion() {
        this.isEditingQuestion = !this.isEditingQuestion;
    }
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
