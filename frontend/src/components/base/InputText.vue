<template>
    <div class="d-flex" :class="{ 'flex-column': !isHorizontal }">
        <label
            v-if="label"
            class="fw-bold text-start mb-2 d-flex align-items-center"
            :class="{ 'w-100': !isHorizontal, 'label mt-1': isHorizontal }"
        >
            {{ label }}
            <span v-if="isRequired" class="mark-required">*</span></label
        >
        <div
            class="position-relative"
            :class="{ 'w-100': !isHorizontal, input: isHorizontal }"
        >
            <el-input
                v-model="inputData"
                :placeholder="placeholder"
                type="text"
                :readonly="isReadonly"
                :disabled="isDisabled"
                :error="true"
                :size="size"
                :maxlength="maxLength"
                @blur="onBlur"
                @keyup="onKeyup"
            />
            <div v-if="!isHorizontal" class="validation-error text-start mb-3">
                {{ error }}&nbsp;
            </div>
        </div>
    </div>
    <div class="d-flex mb-3" v-if="isHorizontal">
        <div class="w-25"></div>
        <div class="w-75 validation-error text-start">{{ error }}&nbsp;</div>
    </div>
</template>

<script lang="ts">
import { ValidationForm } from '@ttlab-packages/ttlab-sorademic-common/common/constants';
import { KeyCode } from '@ttlab-packages/ttlab-sorademic-common/frontend/constants';
import { Model, Prop, Vue } from 'vue-property-decorator';
export default class InputText extends Vue {
    @Prop({ default: '' }) readonly label!: string;
    @Prop({ default: '' }) readonly name!: string;
    @Prop({ default: 'medium' }) readonly size!: string;
    @Prop({ default: '' }) readonly placeholder!: string;
    @Prop({ default: '' }) readonly error!: string;
    @Prop({ default: false }) readonly isRequired!: string;
    @Prop({ default: false }) readonly isReadonly!: boolean;
    @Prop({ default: false }) readonly isDisabled!: boolean;
    @Prop({ default: ValidationForm.INPUT_TEXT_MAX_LENGTH }) readonly maxLength!: number;
    @Prop({ default: false }) readonly isHorizontal!: boolean;

    @Model('value', { type: [String] })
    readonly inputData!: string;

    onBlur() {
        this.$emit('blur');
    }

    onKeyup(event: KeyboardEvent) {
        if (event.code === KeyCode.ENTER) {
            this.$emit('on-enter');
        }
    }
}
</script>

<style lang="scss" scoped>
/** Remove Arrows/Spinners */
/* Chrome, Safari, Edge, Opera */
:deep(.el-input__inner::-webkit-outer-spin-button),
:deep(.el-input__inner::-webkit-inner-spin-button) {
    -webkit-appearance: none;
    margin: 0;
}
</style>
