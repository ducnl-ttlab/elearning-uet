<template>
    <el-dialog
        :width="'70%'"
        v-model="isShowTopicFormPopup"
        @close="closeTopicFormPopup"
        :title="
            isCreate
                ? $t('course.topic.action.createTitle')
                : $t('course.topic.action.editTitle')
        "
    >
        <div class="d-flex flex-row justify-content-between" style="gap: 5vw">
            <div class="form-left" style="width: 25%">
                <BaseInputText
                    class="input"
                    clearable="true"
                    :label="$t('course.topic.form.title')"
                    :placeholder="$t('course.topic.form.title')"
                    v-model:value="selectedTopic.name"
                />
                <BaseInputText
                    class="input"
                    :label="$t('course.topic.form.description')"
                    :placeholder="$t('course.topic.form.description')"
                    v-model:value="selectedTopic.description"
                />
            </div>
            <div class="form-right" style="flex: 1 1 0">
                <label
                    class="fw-bold text-start mb-2 d-flex align-items-center"
                    :class="{ 'w-100': !isHorizontal, 'label mt-1': isHorizontal }"
                >
                    {{ $t('course.topic.form.content') }}
                </label>
                <el-input
                    :placeholder="$t('course.topic.form.content')"
                    type="textarea"
                    autosize
                    v-model="selectedTopic.content"
                />
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { commonModule } from '@/modules/common/store/common.store';
import { Options, Vue } from 'vue-class-component';
import { ITopicData } from '../../constants/course.interfaces';
import {
    createTopic,
    deleteTopic,
    getTopicList,
    updateTopic,
} from '../../services/course';
import { courseModule } from '../../store/course.store';

@Options({
    components: {},
})
export default class TopicFormPopup extends Vue {
    isCreate = false;
    video: File | null = null;
    get isShowTopicFormPopup() {
        return courseModule.isShowTopicFormPopup;
    }

    selectedTopic: ITopicData = courseModule.selectedTopic;

    closeTopicFormPopup() {
        courseModule.toggleShowTopicFormPopup(false);
    }

    async handleSubmitTopic() {
        commonModule.setLoadingIndicator(true);
        const topicData: ITopicData = {
            name: this.selectedTopic.name,
            description: this.selectedTopic.description,
            content: this.selectedTopic.content,
        };
        let formData = new FormData();
        const courseId = +this.$route.params.courseId;
        const { name, description, content } = topicData;

        formData.append('name', name || '');
        formData.append('description', description || '');
        formData.append('content', content || '');

        if (this.video) {
            formData.append('file', this.video || '');
        }
        if (this.isCreate) {
            const response = await createTopic(formData, courseId);
            if (response.success) {
                showSuccessNotificationFunction(
                    this.$t('course.success.topic.createTopic'),
                );
                await getTopicList(courseId);
            } else {
                let res = response?.errors || [
                    { message: this.$t('course.errors.topic.createTopic') },
                ];
                showErrorNotificationFunction(res[0].message);
            }
        } else {
            const response = await updateTopic(formData, courseId);
            if (response.success) {
                showSuccessNotificationFunction(
                    this.$t('course.success.topic.updateTopic'),
                );
                await getTopicList(courseId);
            } else {
                let res = response?.errors || [
                    { message: this.$t('course.errors.topic.editTopic') },
                ];
                showErrorNotificationFunction(res[0].message);
            }
        }
        commonModule.setLoadingIndicator(false);
    }

    async handleDeleteTopic() {
        commonModule.setLoadingIndicator(true);
        const courseId = +this.$route.params.courseId;
        const response = await deleteTopic(courseId);
        if (response.success) {
            showSuccessNotificationFunction(this.$t('course.success.topic.deleteTopic'));
            await getTopicList(courseId);
        } else {
            let res = response.errors || [
                { message: this.$t('course.errors.topic.deleteTopic') },
            ];
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }
}
</script>
<style lang="scss" scoped>
.save-button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    border-radius: 6px;
    white-space: nowrap;
    padding: 8px 20px;
    transition: all 0.44s ease 0s;
    background-color: $color-white;
    color: #000;
    cursor: pointer;
    &-active {
        color: $color-white;
        background-color: $color-violet-new-opacity-50;
    }
}

:deep(.el-dialog) {
    height: 70vh;
    overflow-y: auto !important;
}
</style>
