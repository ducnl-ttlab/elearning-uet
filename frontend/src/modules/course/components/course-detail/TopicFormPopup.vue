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
            <div class="form-left" style="width: 40%">
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
                <div class="d-flex flex-row gap-3 justify-content-start">
                    <label class="fw-bold text-start mb-2 d-flex align-items-center pt-4">
                        {{ $t('course.topic.form.video') }}
                    </label>
                    <label class="upload-button" for="file-input">
                        <div class="upload-wrapper">
                            <img src="@/assets/course/icons/upload.png" alt="" />
                        </div>
                    </label>
                </div>
                <input
                    type="file"
                    accept="video/*"
                    id="file-input"
                    class="d-none"
                    @change="handleFileUpload($event)"
                />
                <video id="video-preview" controls class="pt-2" v-if="video != ''" />
            </div>
            <div class="form-right" style="flex: 1 1 0">
                <label class="fw-bold text-start mb-2 d-flex align-items-center">
                    {{ $t('course.topic.form.content') }}
                </label>
                <!-- <el-input
                    :placeholder="$t('course.topic.form.content')"
                    type="textarea"
                    rows="7"
                    v-model="selectedTopic.content"
                /> -->
                <editor
                    v-model="selectedTopic.content"
                    api-key="no-api-key"
                    :init="{
                        menubar: false,
                        plugins: 'lists link image emoticons',
                        toolbar:
                            'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons',
                    }"
                />
            </div>
        </div>
        <div class="action-area d-flex flex-row w-100 justify-content-end gap-3">
            <div class="button save" @click="handleSubmitTopic">
                {{ $t('course.topic.form.save') }}
            </div>
            <div class="button cancel" @click="handleCancel">
                {{ $t('course.topic.form.cancel') }}
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
import Editor from '@tinymce/tinymce-vue';

@Options({
    components: { Editor },
})
export default class TopicFormPopup extends Vue {
    video: '';
    get isShowTopicFormPopup() {
        return courseModule.isShowTopicFormPopup;
    }

    get popupMode() {
        return courseModule.topicFormPopupMode;
    }

    isCreate = this.popupMode === 'create';

    selectedTopic: ITopicData = this.isCreate
        ? {}
        : Object.assign({}, courseModule.selectedTopic);

    closeTopicFormPopup() {
        courseModule.toggleShowTopicFormPopup(false);
    }

    handleFileUpload(event: any) {
        this.video = event.target.files[0];
        this.previewVideo();
    }

    previewVideo() {
        let video: any = document.getElementById('video-preview');
        let reader = new FileReader();
        reader.readAsDataURL(this.video as any);
        reader.addEventListener('load', function () {
            video.src = reader.result;
        });
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
        formData.append('content', content as string);

        console.log(name, 'name');
        console.log(description, 'description');
        console.log(content, 'content');

        if (this.video) {
            formData.append('file', this.video || '');
        }
        if (this.video) {
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
.button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    border-radius: 6px;
    white-space: nowrap;
    padding: 8px 20px;
    transition: all 0.44s ease 0s;
}

.save {
    background-color: #6d79e8;
    color: #fff;
    cursor: pointer;
}

.save:hover {
    background-color: #4057d08d;
}

.cancel {
    background-color: #f7f7f7;
    color: #000;
    cursor: pointer;
}

.cancel:hover {
    background-color: #f2f2f2;
}

.upload-wrapper {
    cursor: pointer;
    background-color: #aaa;
    border: 1px solid #888;
}
</style>
