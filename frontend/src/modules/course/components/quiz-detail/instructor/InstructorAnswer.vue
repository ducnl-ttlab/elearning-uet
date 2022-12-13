<template>
    <div class="d-flex flex-row align-items-center gap-3">
        <el-checkbox v-model="answer.isCorrect" size="large" />
        <div v-if="!isShowInput">
            {{ answer.content ? answer.content : 'Add your answer' }}
        </div>
        <BaseInputText
            :placeholder="$t('course.quiz.form.title')"
            v-model:value="answer.content"
            @change="handleEditAnswer"
            autocomplete="off"
            style="margin-top: 8px"
            v-else
        />
        <div class="d-flex flex-row gap-2">
            <img
                src="@/assets/course/icons/edit.svg"
                width="16"
                alt=""
                style="cursor: pointer"
                @click="handleEditAnswer"
            />
            <img
                v-if="!isShowInput"
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
    isShowInput = false;

    handleEditAnswer() {
        this.isShowInput = !this.isShowInput;
    }
    handleDeleteAnswer() {
        console.log(this.index);
        let newquizList = courseModule.quizList.map((item) => {
            let { questionList } = item;
            questionList = questionList?.map((questionItem) => {
                let { answerList } = questionItem;
                answerList.splice(this.index, 1);
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
        courseModule.setQuizList(newquizList);
    }
}
</script>
