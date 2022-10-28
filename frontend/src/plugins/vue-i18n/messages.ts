import { commonLocale } from '@/modules/common/locale';
import { authLocale } from '@/modules/auth/locale';
import { homepageLocale } from '@/modules/homepage/locale';
import { yupFields } from './yup-fields.vi';
import { yupVi } from '../yup/locale/vi';

const messages = {
    vi: {
        common: commonLocale.vi,
        auth: authLocale.vi,
        homepage: homepageLocale.vi,
        yup: yupVi,
        yupFields: yupFields,
    },
    en: {
        common: commonLocale.en,
        auth: authLocale.en,
        homepage: homepageLocale.en,
    },
};

export default messages;
