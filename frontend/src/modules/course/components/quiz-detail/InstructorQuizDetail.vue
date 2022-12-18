<template>
    <div class="quiz-detail-wrapper d-flex flex-column gap-4 w-100">
        <div v-if="quizList && quizList.length === 0">
            {{ $t('course.errors.emptyQuizList') }}
        </div>
        <div @click="handleAddQuizButton" class="add-button d-flex flex-row gap-2">
            <img src="@/assets/course/icons/plus.svg" width="18" alt="" />
            <span>{{ $t('course.quiz.form.addQuiz') }}</span>
        </div>
        <div class="add-quiz-area d-flex flex-column gap-4" v-if="isAddingQuiz">
            <div class="field-wrapper">
                <div class="label pb-3">{{ $t('course.quiz.form.title') }}:</div>
                <BaseInputText
                    :placeholder="$t('course.quiz.form.title')"
                    v-model:value="newQuizForm.name"
                    autocomplete="off"
                />
            </div>

            <div class="field-wrapper">
                <div class="label">{{ $t('course.quiz.form.startTime') }}:</div>
                <el-date-picker
                    v-model="newQuizForm.startTime"
                    type="datetime"
                    size="large"
                    :placeholder="$t('course.quiz.form.startTime')"
                />
            </div>

            <div class="field-wrapper">
                <div class="label">{{ $t('course.quiz.form.quizDuration') }}:</div>
                <el-slider
                    style="padding-left: 18px"
                    v-model="newQuizForm.duration"
                    :step="5"
                    :min="5"
                    :max="60"
                    show-stops
                />
            </div>

            <div class="action-buttons d-flex flex-row gap-2">
                <div @click="handleSaveAddQuiz" class="button save-add-quiz">
                    {{ $t('course.quiz.form.save') }}
                </div>
                <div @click="handleCancelAddQuiz" class="button cancel-add-quiz">
                    {{ $t('course.quiz.form.cancel') }}
                </div>
            </div>
        </div>
        <div class="quiz-card" v-for="quiz in quizList" :key="quiz.id">
            <InstructorQuiz :quiz="quiz" />
        </div>
    </div>
</template>

<script lang="ts">
import { SystemRole } from '@/common/constants';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { commonModule } from '@/modules/common/store/common.store';
import { userModule } from '@/modules/user/store/user.store';
import moment from 'moment';
import { Options, Vue } from 'vue-class-component';
import { IQuizDetail } from '../../constants/course.interfaces';
import { createQuiz } from '../../services/course';
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

    quizList: Array<IQuizDetail> = [
        {
            id: 1,
            topicId: 1,
            name: 'Duc mup 1',
            shown: false,
            startTime: '2022/12/16 00:00:00',
            duration: '25',
            questionList: [],
        },
        {
            id: 2,
            topicId: 1,
            name: 'Duc mup 2',
            shown: false,
            startTime: '2022/12/15 00:00:00',
            duration: '25',
            questionList: [],
        },
        {
            id: 3,
            topicId: 1,
            name: 'abc react native',
            shown: false,
            startTime: '2011/12/11 23:21:00',
            duration: '45',
            questionList: [
                {
                    id: 1,
                    quizId: 3,
                    name: 'safdsa',
                    mark: 10,
                    answerList: [
                        {
                            id: 1,
                            content: 'sadfdsaf',
                            isCorrect: true,
                        },
                        {
                            id: 3,
                            content: 'sadfdsaf',
                            isCorrect: false,
                        },
                    ],
                },
                {
                    id: 2,
                    quizId: 3,
                    name: 'hieu mup',
                    mark: 160,
                    answerList: [
                        {
                            id: 2,
                            content: 'sadfdsaf',
                            isCorrect: true,
                        },
                    ],
                },
            ],
        },
        {
            id: 4,
            topicId: 1,
            name: 'Duc mup 123',
            shown: false,
            startTime: '2022/12/16 00:00:00',
            duration: '20',
            questionList: [],
        },
        {
            id: 4,
            topicId: 1,
            name: 'Duc mup 123',
            shown: false,
            startTime: '2022/12/16 00:00:00',
            duration: '20',
            questionList: [],
        },
    ];

    // return courseModule.quizList;

    get isAddingQuiz() {
        return courseModule.isAddingQuiz;
    }

    newQuizForm = {
        name: '',
        startTime: '',
        duration: 0,
    };

    resetNewQuiz() {
        this.newQuizForm = {
            name: '',
            startTime: '',
            duration: 0,
        };
    }

    handleAddQuizButton() {
        courseModule.setAddingQuiz(true);
    }

    async handleSaveAddQuiz() {
        commonModule.setLoadingIndicator(true);
        const courseId = +this.$route.params.courseId;
        const params = {
            ...this.newQuizForm,
            startTime: moment(this.newQuizForm.startTime).format('YYYY-MM-DD HH:mm:ss'),
            duration: `${this.newQuizForm.duration}`,
        };

        const response = await createQuiz(courseId, this.topicId, params);
        if (response?.success) {
            showSuccessNotificationFunction(this.$t('course.success.quiz.createQuiz'));
            courseModule.setQuizList([...this.quizList, response.data || {}]);
        } else {
            let res = response?.errors || [
                { message: this.$t('course.errors.createNewQuizError') },
            ];
            showErrorNotificationFunction(res[0].message);
        }
        this.resetNewQuiz();
        courseModule.setAddingQuiz(false);
        commonModule.setLoadingIndicator(false);
    }

    handleCancelAddQuiz() {
        this.resetNewQuiz();
        courseModule.setAddingQuiz(false);
    }
}
</script>
<style lang="scss" scoped>
.quiz-detail {
    &-wrapper {
        margin: 4vh 3vw;
    }
}

.button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    border-radius: 6px;
    padding: 8px 20px;
    transition: all 0.44s ease 0s;
    cursor: pointer;
}

.save-add-quiz {
    color: $color-white;
    background-color: $color-violet-new-1;
    &:hover {
        background-color: $color-violet-new-opacity-50;
    }
}

.cancel-add-quiz {
    color: #000;
    background-color: #e8e8e8;
    &:hover {
        background-color: #f3f3f3;
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
.field-wrapper {
    display: flex;
    flex-direction: row;
    font-weight: 600;
    align-items: center;
    gap: 12px;
    width: 80%;
}

.label {
    width: 100px;
}
</style>
