import { Injectable, PipeTransform } from '@nestjs/common';
import { trimData } from '../../common/commonFunctions';
@Injectable()
export class TrimBodyPipe implements PipeTransform {
    constructor() {
        //
    }
    transform(body: any) {
        trimData(body);
        return body;
    }
}
