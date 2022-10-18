<template>
    <div>
        <BaseInputText
            class="input"
            :label="$t('guest.auth.login.email.label')"
            :placeholder="$t('guest.auth.login.email.placeholder')"
            v-model:value="loginForm.email"
            :error="translateYupError(loginForm.errors?.email)"
            @on-enter="loginForm.onSubmit"
        />
        <BaseInputPassword
            class="input password-input"
            ref="passwordInput"
            :label="$t('guest.auth.login.password.label')"
            :placeholder="$t('guest.auth.login.password.placeholder')"
            v-model:value="loginForm.password"
            :error="translateYupError(loginForm.errors?.password)"
            @on-enter="loginForm.onSubmit"
        />
        <div class="d-flex justify-content-end">
            <el-button @click="onClickForgotPasswordButton" class="forgot-password">{{
                $t('guest.auth.login.forgotPassword')
            }}</el-button>
        </div>
        <el-button type="primary" @click="loginForm.onSubmit">{{
            $t('guest.auth.login.login')
        }}</el-button>
    </div>
</template>

<script lang="ts">
import { GlobalMixin } from '@/common/mixins';
import router from '@/plugins/vue-router';
import { Options, setup } from 'vue-class-component';
import { setupLoginForm } from '../../compositions/loginForm';
import { loginModule } from '../../stores/login.store';

type IInputPassword = {
    onFocus: () => void;
};

@Options({
    components: {},
})
export default class EmailLoginForm extends GlobalMixin {
    mounted() {
        this.loginForm.resetForm();
        this.loginForm.provider = this.AuthProvider.EMAIL;
        this.loginForm.email = this.loginCredential;
        (this.$refs.passwordInput as IInputPassword).onFocus();
    }

    get loginCredential() {
        return loginModule.loginCredential;
    }

    loginForm = setup(() => setupLoginForm());

    onClickForgotPasswordButton() {
        router.push('/forgot-password');
    }
}
</script>
<style lang="scss" scoped>
.el-button {
    max-width: 454px;
    width: 90vw;
    height: 48px;
    margin: 0 auto 12px;
}
:deep(.forgot-password.el-button) {
    height: 23px;
    width: fit-content !important;
    font-weight: 400;
    font-size: 15px;
    color: $color-violet-new-1 !important;
    line-height: 24px;
    border: none;
    padding: 0;
    margin: 10px 0 24px !important;
}
</style>
