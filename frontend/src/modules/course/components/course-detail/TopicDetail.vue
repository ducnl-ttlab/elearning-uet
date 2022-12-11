<template>
    <div class="topic-detail-wrapper d-flex flex-column w-100">
        <div class="topic-detail-title">{{ selectedTopic?.name }}</div>
        <div class="topic-detail-description pt-4">{{ selectedTopic?.description }}</div>
        <div class="topic-detail-"></div>
        <BaseNoResult
            v-if="selectedTopic && !selectedTopic.id"
            :message="$t('course.errors.getTopicListError')"
        />
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
export default class TopicDetail extends Vue {
    SystemRole = SystemRole;

    get userRole() {
        return userModule.userData.role;
    }
    get selectedTopic() {
        return courseModule.selectedTopic;
    }
}
</script>
<style lang="scss" scoped>
.topic-detail {
    &-wrapper {
        padding: 6vh 3vw;
    }

    &-title {
        font-weight: 600;
        font-size: 36px;
    }

    &-description {
        font-weight: 400;
        font-size: 20px;
    }
}
</style>
