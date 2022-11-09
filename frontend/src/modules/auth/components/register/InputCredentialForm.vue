<template>
    <div class="input-form-container d-flex flex-column">
        <div class="title">{{ $t('auth.general.welcomeTitle') }}</div>
        <div class="sub-title">{{ $t('auth.register.welcomeDescription') }}</div>
        <BaseInputText
            class="input"
            :label="$t('auth.register.credential.label')"
            :placeholder="$t('auth.register.credential.placeholder')"
            v-model:value="credential"
            :error="credentialError"
            @on-enter="onSubmitCredential"
        />
        <el-button
            :disabled="!credential ? '' : disabled"
            type="primary"
            class="register-button"
            @click="onSubmitCredential"
        >
            {{ $t('auth.register.register') }}
        </el-button>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {},
})
export default class InputCredentialForm extends Vue {
    credential = '';
    credentialError = '';

    async onSubmitCredential() {
        console.log('submitted');
        this.credentialError = this.$t('guest.auth.register.credential.invalidFormat');
    }
}
</script>

<style lang="scss" scoped>
.input-form-container {
    gap: 10px;
}

.el-button {
    max-width: 454px;
    width: 90vw;
    height: 48px;
    margin: 0 auto;
}

.title {
    max-width: 454px;
    text-align: center;
    color: $color-gray-01;
    font-size: 40px;
    line-height: 56px;
    font-weight: 700;
    margin: 20px auto 0;
}

.sub-title {
    max-width: 454px;
    text-align: center;
    color: $color-gray-03;
    font-size: 15px;
    line-height: 22.5px;
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 10px;
}

.register-button {
    background-color: $color-violet-new-1 !important;
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: md)) {
    .title {
        font-size: 32px !important;
        line-height: 48px !important;
        margin: 32px auto 0 !important;
    }
}
</style>
