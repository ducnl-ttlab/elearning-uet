import { PipeTransform, Injectable } from '@nestjs/common';
import { removeEmptyValue } from '../../common/commonFunctions';

type QueryType =
    | string
    | number
    | number[]
    | string[]
    | Record<string, string | number>
    | Record<string, string | number>[];

@Injectable()
export class RemoveEmptyQueryPipe implements PipeTransform {
    constructor() {
        //
    }

    transform(query: QueryType) {
        removeEmptyValue(query);
        return query;
    }
}
