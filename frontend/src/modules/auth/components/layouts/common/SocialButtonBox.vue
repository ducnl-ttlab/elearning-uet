<template>
    <div class="form social-button-box">
        <el-divider class="divider">{{ $t('auth.auth.or') }}</el-divider>
        <el-button @click="requestSocialLoginUrl(AuthProvider.ZALO)"
            ><img class="button-image" src="@/assets/auth/images/zalo-logo.svg" alt="" />
            {{
                isLogin ? $t('auth.login.zaloLogin') : $t('auth.register.zaloRegister')
            }}</el-button
        >
        <el-button @click="requestSocialLoginUrl(AuthProvider.FACEBOOK)"
            ><img
                class="button-image"
                src="@/assets/auth/images/facebook-logo.svg"
                alt=""
            />{{
                isLogin
                    ? $t('auth.login.facebookLogin')
                    : $t('auth.register.facebookRegister')
            }}</el-button
        >
        <el-button @click.prevent="signupWithGoogle"
            ><img
                class="button-image"
                src="@/assets/auth/images/google-logo.svg"
                alt=""
            />{{
                isLogin
                    ? $t('auth.login.googleLogin')
                    : $t('auth.register.googleRegister')
            }}
        </el-button>
    </div>
</template>
<script lang="ts">
import { showErrorNotificationFunction } from '@/common/helpers';
import { AuthProvider } from '@/modules/auth/constants/auth.constants';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { register } from '@/modules/auth/services/register';

@Options({
    components: {},
})
export default class SocialButtonBox extends Vue {
    @Prop({ default: true }) readonly isLogin!: boolean;
    AuthProvider = AuthProvider;
    async register() {
        const email = '19020286@vnu.edu.vn';
        let response = await register(email);
    }
}
</script>
<style lang="scss" scoped>
.social-button-box {
    :deep(.el-button) {
        font-weight: 400;
        display: flex;
        justify-content: start;
        padding-left: 23%;
        max-width: 454px;
        width: 90vw;
        height: 48px;
        margin: 0 auto 12px;
        &:hover {
            background-color: $color-accent-violet-03 !important;
        }
    }

    .button-image {
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }
    :deep(.el-button:hover img) {
        filter: none;
    }
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: md)) {
    .social-button-box {
        :deep(.el-button) {
            padding-left: 10%;
        }
    }
}

.divider {
    margin: 14px 0 30px;
}
</style>
