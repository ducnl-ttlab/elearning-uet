import bcrypt from 'bcrypt';

export function extractToken(authorization = '') {
    if (/^Bearer /.test(authorization)) {
        return authorization.substring(7, authorization.length);
    }
    return '';
}

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

/**
 * usecase: convert value of $select operator to value of $project operator in mongodb
 * example: ['_id', 'name'] => {
 *      _id: 1,
 *      name: 1,
 * }
 * @param attributeList attributes list select from mongo collection
 * @returns attributes list in $project operation
 */
export const parseMongoProjection = (
    attributeList: string[],
): Record<string, number> => {
    let rs = {};
    attributeList.forEach((val) => {
        rs = {
            ...rs,
            [val]: 1,
        };
    });

    return rs;
};



export function getTotalSkipItem(page: number, limit: number) {
    return page > 0 ? (page - 1) * limit : 0;
}



