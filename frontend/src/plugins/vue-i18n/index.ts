import { DEFAULT_LANGUAGE } from '../../common/constants';
import { createI18n } from 'vue-i18n';
import messages from './messages';

const i18n = createI18n({
    locale: DEFAULT_LANGUAGE, // set locale
    fallbackLocale: DEFAULT_LANGUAGE, // set fallback locale
    messages, // set locale messages
    globalInjection: true,
});

export default i18n;
