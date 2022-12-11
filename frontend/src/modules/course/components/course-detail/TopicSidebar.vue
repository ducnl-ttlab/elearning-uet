<template>
    <div class="topic-sidebar-wrapper d-flex flex-column">
        <div
            @click="handleToggleSidebar"
            class="button topic-title d-flex justify-content-between"
            :class="{ collapsed: isCollapsed }"
            style="cursor: pointer"
        >
            <span v-if="!isCollapsed" class="text-ellipsis">{{
                $t('course.topicSidebar.title')
            }}</span>
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
            @click="handleClickTopic(topic?.id)"
            class="button sidebar d-flex"
            :class="{ collapsed: isCollapsed }"
        >
            <div>{{ topic?.id }}</div>
            <div v-if="!isCollapsed" class="text-ellipsis">
                {{ '.\xa0' }}
                {{ topic?.name }}
            </div>
        </div>
        <div
            class="button d-flex no-topic"
            :class="{ collapsed: isCollapsed }"
            v-if="topicList?.length === 0"
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

    get isCollapsed() {
        return this.topicSidebarMode === TopicSidebarMode.COLLAPSED;
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
        courseModule.toggleShowTopicVideo(false);
    }

    handleAddTopic() {
        console.log('emiited');
    }

    created(): void {
        window.addEventListener('resize', this.showFullScreenOnMobile);
        this.showFullScreenOnMobile();
    }
    showFullScreenOnMobile() {
        if (document.documentElement.clientWidth <= 1200) {
            courseModule.setTopicSidebarMode(TopicSidebarMode.COLLAPSED);
        } else {
            courseModule.setTopicSidebarMode(TopicSidebarMode.EXPANDED);
        }
    }
}
</script>
<style lang="scss" scoped>
.topic-sidebar-wrapper {
    min-height: 169px;
    height: 100%;
    cursor: pointer;
    background-color: #f9f9f9;
}

.button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
    padding: 12px 24px;
    transition: all 0.44s ease 0s;
    cursor: pointer;
    color: $color-white;

    width: 16vw;
}

.collapsed {
    width: 60px;
    padding: 12px 0;
    justify-content: center !important;
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

.j-center {
    justify-content: center !important;
}

.text-ellipsis {
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}
</style>
