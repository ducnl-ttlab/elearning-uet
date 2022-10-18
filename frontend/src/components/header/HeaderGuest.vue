<template>
    <div class="d-flex flex-row align-items-center">
        <router-link
            class="text-decoration-none"
            :to="{ name: PageName.GUEST_LOGIN_PAGE }"
        >
            <span class="guest-button login-button">
                {{ $t('common.header.loginButton') }}
            </span>
        </router-link>
        <router-link
            class="text-decoration-none"
            :to="{ name: PageName.GUEST_REGISTER_PAGE }"
        >
            <el-button class="guest-button register-button" type="primary">
                {{ $t('common.header.registerButton') }}
            </el-button>
        </router-link>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { SupportLanguage, DEFAULT_LANGUAGE } from '@/common/constants';
import { PageName } from '@/common/constants';
import MenuLanguage from '@/components/header/MenuLanguage.vue';

@Options({ components: { MenuLanguage } })
export default class HeaderGuest extends Vue {
    PageName = PageName;
    languages = Object.values(SupportLanguage);
    selectedLanguage = DEFAULT_LANGUAGE;

    changeLanguage = (selectedLanguageCode: SupportLanguage) => {
        this.selectedLanguage = selectedLanguageCode;
    };
}
</script>

<style lang="scss" scoped>
.guest-button {
    font-size: 17px !important;
    font-weight: 600 !important;
    line-height: 24px !important;
}

.login-button {
    margin: 0 24px 0 0;
    color: $color-gray-01 !important;
    white-space: nowrap;
}

:deep(.register-button.el-button) {
    width: 124px !important;
    height: 44px !important;
    padding: 10px !important;
    align-content: center !important;
    border: none !important;
    background-color: $color-violet-new-1 !important;
    color: $color-white !important;
}
:deep(.register-button.el-button):hover {
    background-color: $color-violet-new !important;
}

@media only screen and (max-width: map-get($map: $grid-breakpoints, $key: lg)) {
    .select-language {
        margin-right: 12px;
    }

    :deep(.el-input__suffix-inner > :first-child) {
        margin-left: 0px !important;
    }

    .login-button {
        margin-right: 12px;
    }

    .register-button {
        width: 114px !important;
    }
}
</style>
