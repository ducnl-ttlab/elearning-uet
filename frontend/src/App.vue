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
import './plugins/socket';

import vi from './plugins/element-ui/locale/vi';
import en from './plugins/element-ui/locale/en';

import { DEFAULT_LANGUAGE, SupportLanguage } from './common/constants';
import tokenService from './common/tokenService';
import { locale } from 'dayjs';
import { RouterView } from 'vue-router';
import { getUserData } from './modules/user/services/user';
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
    async created() {
        await getUserData();
    }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
