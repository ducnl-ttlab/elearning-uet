<template>
    <ElConfigProvider :locale="locale">
        <router-view />
    </ElConfigProvider>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ElConfigProvider } from 'element-plus';

import vi from '@/plugins/element-ui/locale/vi';
import en from '@/plugins/element-ui/locale/en';

import { DEFAULT_LANGUAGE, SupportLanguage } from './common/constants';
import tokenService from './common/tokenService';
@Options({
    components: {
        ElConfigProvider,
    },
})
export default class App extends Vue {
    get locale(): Record<string, unknown> {
        const i18nLocale = tokenService.getLanguage() || DEFAULT_LANGUAGE;
        if (i18nLocale === SupportLanguage.VI) {
            return vi;
        }
        return en;
    }
}
</script>
