<template>
    <div
        v-if="topicSidebarMode === TopicSidebarMode.EXPANDED"
        class="topic-sidebar-expanded-wrapper d-flex flex-column"
    >
        <div
            @click="handleToggleSidebar"
            class="button topic-title d-flex justify-content-between"
            style="cursor: pointer"
        >
            <span>{{ $t('course.topicSidebar.title') }}</span>
            <img
                v-if="userRole === SystemRole.INSTRUCTOR"
                style="cursor: pointer"
                src="@/assets/course/icons/plus.svg"
                width="25"
                alt=""
                @click="handleAddTopic"
            />
        </div>
        <div v-for="topic in topicList" :key="topic.id" class="button sidebar">
            <div @click="handleClickTopic(topic?.id)">
                <span>{{ topic?.id }}. </span>
                <span>{{ topic?.name }}</span>
            </div>
        </div>
        <div class="button d-flex no-topic" v-if="topicList?.length === 0">
            {{ $t('course.errors.getTopicListError') }}
        </div>
    </div>
    <div v-else class="topic-sidebar-collapsed-wrapper d-flex flex-column">
        <div
            @click="handleToggleSidebar"
            class="button collapsed topic-title d-flex justify-content-center"
        >
            <img
                v-if="userRole === SystemRole.INSTRUCTOR"
                style="cursor: pointer"
                src="@/assets/course/icons/plus.svg"
                width="25"
                alt=""
                @click="handleAddTopic"
            />
        </div>
        <div
            v-for="topic in topicList"
            :key="topic.id"
            class="button collapsed sidebar d-flex justify-content-center"
        >
            <div @click="handleClickTopic(topic.id)">
                <span>{{ topic?.id }} </span>
            </div>
        </div>
        <div
            v-if="
                topicSidebarMode === TopicSidebarMode.EXPANDED && topicList?.length === 0
            "
            class="button collapsed d-flex no-topic"
        >
            {{ $t('course.errors.getTopicListError') }}
        </div>
    </div>
</template>

<script lang="ts">
import { SystemRole } from '@/common/constants';
import { userModule } from '@/modules/user/store/user.store';
import { Options, Vue } from 'vue-class-component';
import { TopicSidebarMode } from '../../constants/course.constants';
import { courseModule } from '../../store/course.store';

@Options({
    components: {},
})
export default class CourseSidebar extends Vue {
    TopicSidebarMode = TopicSidebarMode;
    SystemRole = SystemRole;

    get userRole() {
        return userModule.userData.role;
    }
    get topicList() {
        return courseModule.topicList;
    }

    get selectedTopic() {
        return courseModule.selectedTopic;
    }

    get topicSidebarMode() {
        return courseModule.topicSidebarMode;
    }

    handleToggleSidebar() {
        if (this.topicSidebarMode === TopicSidebarMode.EXPANDED) {
            courseModule.setTopicSidebarMode(TopicSidebarMode.COLLAPSED);
        } else {
            courseModule.setTopicSidebarMode(TopicSidebarMode.EXPANDED);
        }
        console.log(this.topicSidebarMode);
    }

    handleClickTopic(id: number) {
        courseModule.setSelectedTopic(id);
        console.log(this.selectedTopic);
    }

    handleAddTopic() {
        console.log('emiited');
    }
}
</script>
<style lang="scss" scoped>
.topic-sidebar-expanded-wrapper {
    cursor: pointer;
}

.course-sidebar-wrapper {
    min-height: 169px;
    height: 100%;
    background-color: $color-violet-new;
}

.button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    white-space: nowrap;
    padding: 12px 24px;
    transition: all 0.44s ease 0s;
    cursor: pointer;
    color: $color-white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 16vw;
}

.collapsed {
    width: 60px;
    padding: 12px 0;
}
.sidebar {
    background-color: $color-violet-new-1;
    &:hover {
        background-color: $color-violet-new;
    }
}
.add-topic {
    background-color: #39e75f;
    &:hover {
        background-color: #83f28f;
    }
}
.no-topic {
    background-color: #f9f9f9;
    color: #000;
    padding: 48px 0;
    justify-content: center;
    font-weight: 300 !important;
    font-size: 14px;
    cursor: initial;
}

.topic-title {
    background-color: #e6e6f0;
    color: #000;
}
</style>
