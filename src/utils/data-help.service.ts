import { Injectable } from '@nestjs/common';
import { QueryResponseI } from '@src/mec/interface/response/response.interface';

@Injectable()
export class DataHelperService {
    valueToBoolean(value: any) {
        if (value === undefined || value === null) {
            return null;
        }

        if (typeof value === 'boolean') {
            return value;
        }
        if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
            return true;
        }
        if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
            return false;
        }
        return null;
    }

    toSingleObject({ response }: { response: QueryResponseI }): any {
        if (response.result != undefined && response.result != null) {
            if (Array.isArray(response.result)) {
                return response.result[0];
            }
            return response.result;
        }
    }
}
