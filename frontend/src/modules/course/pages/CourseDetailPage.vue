<template>
    <div class="course-detail-page">
        <CourseDetail />
        <div @click="toggleChatPopup" class="chat-wrapper">
            <img src="@/assets/course/images/chat.png" width="40" alt="" />
        </div>
        <ChatPopup />
    </div>
</template>

<script lang="ts">
import { commonModule } from '@/modules/common/store/common.store';
import { Options, Vue } from 'vue-class-component';
import CourseDetail from '../components/course-detail/CourseDetail.vue';
import { CourseArea, SidebarMode } from '../constants/course.constants';
import { courseModule } from '../store/course.store';
import ChatPopup from '../components/course-detail/ChatPopup.vue';
import socketInstance from '@/plugins/socket';

@Options({
    components: { CourseDetail, ChatPopup },
})
export default class CourseListPage extends Vue {
    created() {
        courseModule.setTopicSidebarMode(SidebarMode.COLLAPSED);
        courseModule.setQuizSidebarMode(SidebarMode.COLLAPSED);
        courseModule.setCourseArea(CourseArea.COURSE);
        socketInstance.joinRoom(+this.$route.params.courseId);
        socketInstance.listenChat((data) => {
            if (courseModule.currentChatTopicId === data.sourceId) {
                courseModule.setMessageList([...courseModule.messageList, { ...data }]);
            }
        });
    }

    get isShowChatPopup() {
        return commonModule.isShowChatPopup;
    }

    toggleChatPopup() {
        commonModule.toggleChatPopup(true);
    }
}
</script>
<style lang="scss" scoped>
.chat-wrapper {
    position: fixed;
    bottom: 12vh;
    right: 3vw;
    padding: 12px;
    border-radius: 50%;
    background: $color-violet-new-1;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
        background: $color-violet-new-2;
    }
}
</style>
