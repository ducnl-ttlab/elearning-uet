<template>
    <div class="login-form-container d-flex flex-column">
        <div class="title">{{ $t('auth.general.welcomeTitle') }}</div>
        <div class="inputs d-flex flex-column">
            <BaseInputText
                class="input"
                :label="$t('auth.register.credential.label')"
                :placeholder="$t('auth.register.credential.placeholder')"
                :error="credentialError"
                v-model:value="credential"
                autocomplete="off"
            />
            <BaseInputPassword
                class="input input-password"
                :label="$t('auth.login.password.label')"
                :placeholder="$t('auth.login.password.label')"
                v-model:value="password"
                @on-enter="handleLogin"
                autocomplete="off"
            />
        </div>
        <el-button
            :disabled="!password ? true : false"
            type="primary"
            class="login-button"
            @click="handleLogin"
        >
            {{ $t('auth.login.login') }}
        </el-button>
    </div>
</template>
<script lang="ts">
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { Options, Vue } from 'vue-class-component';
import { login } from '../../services/login';
import { commonModule } from '@/common/store/common.store';
import { loginModule } from '../../store/login.store';
import { PageName, SystemRole } from '@/common/constants';

@Options({
    components: {},
})
export default class InputCredentialForm extends Vue {
    credential = '';
    credentialError = '';
    password = '12345678';

    get loginCredential() {
        return loginModule.loginCredential;
    }

    get accessToken() {
        return loginModule.accessToken;
    }

    async handleLogin() {
        commonModule.setLoadingIndicator(true);
        const params = {
            email: this.credential,
            password: this.password,
        };
        const response = await login(params);
        if (response?.success) {
            loginModule.setLoginCredential(response?.data?.user || {});
            loginModule.setAccessToken(response?.data?.accessToken || '');

            if (this.loginCredential.role === SystemRole.GUEST) {
                this.$router.push({
                    name: PageName.SELECT_ROLE_PAGE,
                });
            } else if (this.loginCredential.role === SystemRole.PENDING) {
                this.$router.push({ name: PageName.PENDING_APPROVE_PAGE });
            } else {
                this.$router.push({ name: PageName.LANDING_PAGE });
            }
        } else {
            let res = response?.errors || [{ message: 'SOME ERRORS' }];
            showErrorNotificationFunction(res[0].message);
        }
        commonModule.setLoadingIndicator(false);
    }
}
</script>

<style lang="scss" scoped>
.login-form-container {
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

.login-button {
    background-color: $color-violet-new-1 !important;
}

:deep(.el-input) {
    height: 48px;
}

:deep(label) {
    font-size: 15px;
    font-weight: 600;
    line-height: 24px;
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: md)) {
    .title {
        font-size: 32px !important;
        line-height: 48px !important;
        margin: 32px auto 0 !important;
    }
}
</style>
