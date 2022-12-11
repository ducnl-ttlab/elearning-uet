<template>
    <div>
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
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { courseModule } from '../../store/course.store';

@Options({
    components: {},
})
export default class TopicFormPopup extends Vue {
    get isShowTopicFormPopup() {
        return courseModule.isShowTopicFormPopup;
    }

    isCreate = false;

    closeTopicFormPopup() {
        courseModule.toggleShowTopicFormPopup(false);
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
