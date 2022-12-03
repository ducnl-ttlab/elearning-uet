<template>
    <ElConfigProvider :locale="locale">
        <LoadingIndicator />
        <router-view />
    </ElConfigProvider>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ElConfigProvider } from 'element-plus';
import LoadingIndicator from '@/components/common/LoadingIndicator.vue';

import vi from './plugins/element-ui/locale/vi';
import en from './plugins/element-ui/locale/en';

import { DEFAULT_LANGUAGE, SupportLanguage } from './common/constants';
import tokenService from './common/tokenService';
@Options({
    components: {
        ElConfigProvider,
        LoadingIndicator,
    },
})
export default class App extends Vue {
    get locale(): Record<string, unknown> {
        const i18nLocale = tokenService.getLanguage() || SupportLanguage.VI;
        return en;
    }
}
</script>
<style lang="scss" scoped></style>
