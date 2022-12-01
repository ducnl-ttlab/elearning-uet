import { commonLocale } from '@/modules/common/locale';
import { authLocale } from '@/modules/auth/locale';
import { landingLocale } from '@/modules/landing/locale';
import { yupFields } from './yup-fields.vi';
import { yupVi } from '../yup/locale/vi';

const messages = {
    vi: {
        common: commonLocale.vi,
        auth: authLocale.vi,
        landing: landingLocale.vi,
        yup: yupVi,
        yupFields: yupFields,
    },
    en: {
        common: commonLocale.en,
        auth: authLocale.en,
        landing: landingLocale.en,
    },
};

export default messages;
