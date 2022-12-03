import { commonLocale } from '@/modules/common/locale';
import { authLocale } from '@/modules/auth/locale';
import { landingLocale } from '@/modules/landing/locale';
import { courseLocale } from '@/modules/course/locale';
import { yupFields } from './yup-fields.vi';
import { yupVi } from '../yup/locale/vi';

const messages = {
    vi: {
        common: commonLocale.vi,
        auth: authLocale.vi,
        landing: landingLocale.vi,
        course: courseLocale.vi,
        yup: yupVi,
        yupFields: yupFields,
    },
    en: {
        common: commonLocale.en,
        auth: authLocale.en,
        landing: landingLocale.en,
        course: courseLocale.en,
    },
};

export default messages;
