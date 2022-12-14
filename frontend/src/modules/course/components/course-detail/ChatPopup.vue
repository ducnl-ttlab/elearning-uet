<template>
    <div
        class="chat-window-wrapper d-flex flex-column justify-content-between"
        :style="[
            { display: isShowChatPopup ? 'block' : 'none !important' },
            { width: isShowChatPopup ? '25%' : '0' },
        ]"
    >
        <div
            class="chat-header d-flex flex-row justify-content-between align-items-center"
        >
            <div class="chat-header-title">{{ selectedTopic?.name }}</div>
            <img
                @click="closeChatPopup"
                src="@/assets/course/icons/close.svg"
                style="cursor: pointer"
                width="12"
                alt=""
            />
        </div>

        <div class="chat-window">
            <div v-for="message in messageList" :key="message.id">
                {{ message.comment }}
            </div>
        </div>
        <div
            class="create-message-area d-flex flex-row align-items-center w-100 gap-4 justify-content-between"
        >
            <el-input
                class="input send-message-input"
                :placeholder="$t('course.chat.sendMessage')"
                v-model="keyword"
                autocomplete="off"
                size="large"
            />
            <div @click="handleSendMessage" class="send-message-icon">
                <img src="@/assets/course/icons/send.png" width="25" alt="" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { commonModule } from '@/modules/common/store/common.store';
import i18n from '@/plugins/vue-i18n';
import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { getMessageList } from '../../services/course';
import { courseModule } from '../../store/course.store';

@Options({
    components: {},
})
export default class ChatPopup extends Vue {
    keyword = '';

    get isShowChatPopup() {
        return commonModule.isShowChatPopup;
    }

    get selectedTopic() {
        return courseModule.selectedTopic;
    }

    closeChatPopup() {
        commonModule.toggleChatPopup(false);
    }

    get messageList() {
        return courseModule.messageList;
    }

    async getMessageList() {
        commonModule.setLoadingIndicator(true);
        const courseId = +this.$route.params.courseId;
        const params = {
            topicId: this.selectedTopic.id,
            page: DEFAULT_FIRST_PAGE,
            pageSize: 20,
        };
        const response = await getMessageList(courseId, params);
        if (response.success) {
            courseModule.setMessageList(response.data?.items || []);
        } else {
            courseModule.setMessageList([]);
            showErrorNotificationFunction('');
        }
        commonModule.setLoadingIndicator(false);
    }

    created() {
        this.$watch('isShowChatPopup', () => {
            this.getMessageList();
        });
        this.$watch('selectedTopic', () => {
            this.getMessageList();
        });
    }

    handleSendMessage() {
        console.log('sent');
    }
}
</script>
<style lang="scss" scoped>
.option-button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    border-radius: 12px;
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

.chat-window-wrapper {
    position: fixed;
    bottom: 0;
    right: 3vw;
    height: 50vh;
    border-radius: 6px;
    background: #f3f3f3;
    transition: all 0.5s ease;
    padding: 15px 20px;
}

.send-message-input {
    flex: 1 1 0;
}

.create-message-area {
    border-top: 1px solid #f0f0f0;
    border-radius: 7px;
    padding: 15px 5px 5px;
}

:deep(.el-dialog) {
    height: 70vh;
    overflow-y: auto !important;
}
</style>
