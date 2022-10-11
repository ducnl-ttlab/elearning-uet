import Joi from './plugins/joi';
import {
    INTEGER_POSITIVE_MIN_VALUE,
    OrderBy,
    OrderDirection,
    PAGINATION_MAX_LIMIT,
    PAGINATION_MAX_PAGE,
    ValidationForm,
} from '../common/constants';
export const CommonListQuerySchema = {
    page: Joi.number()
        .min(INTEGER_POSITIVE_MIN_VALUE)
        .max(PAGINATION_MAX_PAGE)
        .optional()
        .allow(null),
    limit: Joi.number()
        .min(INTEGER_POSITIVE_MIN_VALUE)
        .max(PAGINATION_MAX_LIMIT)
        .optional()
        .allow(null),
    keyword: Joi.string()
        .max(ValidationForm.INPUT_TEXT_MAX_LENGTH)
        .optional()
        .allow(null, ''),
    orderDirection: Joi.string()
        .valid(...Object.values(OrderDirection))
        .optional(),
    orderBy: Joi.string()
        .valid(...Object.values(OrderBy))
        .optional(),
};

export const softDeleteCondition = {
    $or: [
        {
            deletedAt: {
                $exists: true,
                $eq: null,
            },
        },
        {
            deletedAt: {
                $exists: false,
            },
        },
        {
            deletedAt: {
                $gt: new Date(),
            },
        },
    ],
};
