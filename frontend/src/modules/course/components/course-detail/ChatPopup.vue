<template>
    <div
        class="chat-window-wrapper flex-column"
        :style="[
            { display: isShowChatPopup ? 'flex' : 'none !important' },
            { width: isShowChatPopup ? '425px' : '0' },
        ]"
    >
        <div class="top d-flex flex-row justify-content-between align-items-center">
            <el-select
                filterable
                v-model="topicId"
                :placeholder="$t('course.topicSidebar.title')"
                size="large"
            >
                <el-option
                    v-for="topic in topicList"
                    :key="topic.id"
                    :label="topic.name"
                    :value="topic.id"
                    class="text-ellipsis"
                />
            </el-select>
            <img
                @click="closeChatPopup"
                src="@/assets/course/icons/close.svg"
                style="cursor: pointer; margin-right: 8px"
                width="12"
                alt=""
            />
        </div>

        <div
            id="chat-box"
            class="middle d-flex flex-column gap-4 align-items-start w-100"
        >
            <div
                class="comment-content-wrapper d-flex gap-3"
                :style="{
                    'flex-direction': isOwnMessage(message) ? 'row-reverse' : 'row',
                }"
                v-for="message in messageList"
                :key="message.id"
            >
                <div style="align-self: end">
                    <img
                        :src="message.avatar"
                        width="35"
                        style="border-radius: 50%"
                        alt=""
                    />
                </div>

                <CommentData :message="message" :isOwnMessage="isOwnMessage" />
            </div>
        </div>
        <div
            class="bottom d-flex flex-row align-items-center w-100 gap-4 justify-content-between"
        >
            <el-input
                @change="handleSendMessage"
                class="input send-message-input"
                :placeholder="$t('course.chat.sendMessage')"
                v-model="message"
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
import { showErrorNotificationFunction } from '@/common/helpers';
import { commonModule } from '@/modules/common/store/common.store';
import { userModule } from '@/modules/user/store/user.store';
import socketInstance from '@/plugins/socket';
import { ref } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { IMessageDetail } from '../../constants/course.interfaces';
import { getMessageList, sendMessage } from '../../services/course';
import { courseModule } from '../../store/course.store';
import CommentData from './CommentData.vue';

@Options({
    components: { CommentData },
})
export default class ChatPopup extends Vue {
    message = '';
    topicId = ref(1);

    get userId() {
        return userModule.userData.id;
    }

    get isShowChatPopup() {
        return commonModule.isShowChatPopup;
    }

    get selectedTopic() {
        return courseModule.selectedTopic;
    }

    get topicList() {
        return courseModule.topicList;
    }

    isOwnMessage(message: IMessageDetail) {
        return message.userId === this.userId;
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
            topicId: +this.topicId,
            page: DEFAULT_FIRST_PAGE,
            pageSize: 20,
        };
        const response = await getMessageList(courseId, params);
        if (response.success) {
            courseModule.setMessageList(response.data?.items || []);
            courseModule.setCurrentChatTopicId(+this.topicId);
        } else {
            courseModule.setMessageList([]);
            showErrorNotificationFunction('');
        }
        commonModule.setLoadingIndicator(false);
    }

    mounted() {
        this.$watch('isShowChatPopup', () => {
            this.getMessageList();
        });
        this.$watch('topicId', () => {
            this.getMessageList();
        });
    }

    async handleSendMessage() {
        commonModule.setLoadingIndicator(true);
        const courseId = +this.$route.params.courseId;
        socketInstance.chatRealtime(courseId, +this.topicId, this.message);
        const response = await sendMessage(courseId, +this.topicId, this.message);
        if (response.success) {
            // courseModule.setMessageList(response.data?.items || []);
            this.message = '';
            // await this.getMessageList();
        } else {
            // showErrorNotificationFunction('');
        }
        commonModule.setLoadingIndicator(false);
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
    height: 60vh;
    border-radius: 6px;
    background: #f3f3f3;
}

.top {
    background: $color-violet-new-1;
    padding: 10px 15px;
}

.bottom {
    border-top: 1px solid #f0f0f0;
    border-radius: 7px;
    padding: 15px 5px 5px;
    flex: 0 0 auto;
}

.middle {
    background-color: $color-violet-new-1-opacity-30;
    padding: 15px;
    flex: 1;
    overflow: auto;
}

.send-message-input {
    flex: 1 1 0;
}

.comment-content-wrapper {
    width: 100%;
}

.text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: xl)) {
    .chat-window-wrapper {
        width: 50% !important;
    }
}
</style>
