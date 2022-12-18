<template>
    <div class="d-flex flex-row align-items-center gap-3">
        <el-checkbox v-model="answer.isCorrect" size="large" />
        <div v-if="!isEditingAnswer">
            {{ answer.content ? answer.content : 'Add your answer' }}
        </div>
        <el-input
            :placeholder="$t('course.quiz.form.title')"
            v-model.trim="answer.content"
            @change="toggleEditAnswer"
            autocomplete="off"
            v-else
        />
        <div class="d-flex flex-row gap-2">
            <img
                src="@/assets/course/icons/edit.svg"
                width="16"
                alt=""
                style="cursor: pointer"
                @click="toggleEditAnswer"
            />
            <img
                v-if="!isEditingAnswer"
                src="@/assets/course/icons/cancel.svg"
                width="16"
                alt=""
                style="cursor: pointer"
                @click="handleDeleteAnswer"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { IAnswerDetail } from '../../../constants/course.interfaces';
import { Prop } from 'vue-property-decorator';
import { courseModule } from '@/modules/course/store/course.store';

@Options({
    components: {},
})
export default class InstructorAnswer extends Vue {
    @Prop({ default: {} }) readonly answer!: IAnswerDetail;
    @Prop({ default: 0 }) readonly index!: number;
    isEditingAnswer = false;

    toggleEditAnswer() {
        this.isEditingAnswer = !this.isEditingAnswer;
    }
    handleDeleteAnswer() {
        let newQuizList = courseModule.quizList.map((item) => {
            let { questionList } = item;
            questionList = questionList?.map((questionItem) => {
                let { answerList } = questionItem;
                answerList?.splice(this.index, 1);
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
}
</script>
