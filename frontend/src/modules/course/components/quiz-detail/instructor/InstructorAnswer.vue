<template>
    <el-checkbox :label="answer.content" v-model="answer.isCorrect" size="large" />
    <div class="d-flex flex-row gap-2">
        <img src="@/assets/course/icons/edit.svg" width="16" alt="" />
        <img src="@/assets/course/icons/cancel.svg" width="16" alt="" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { IAnswerDetail } from '../../../constants/course.interfaces';
import { Prop } from 'vue-property-decorator';

@Options({
    components: {},
})
export default class InstructorAnswer extends Vue {
    @Prop({ default: {} }) readonly answer!: IAnswerDetail;
}
</script>
