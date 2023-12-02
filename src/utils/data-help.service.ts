/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { QueryResponseI } from '@src/mec/interface/query/query.interface';

export class DataHelperService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueToBoolean({ value }: { value: any }): boolean {
        if (value === undefined || value === null) return undefined;
        if (typeof value === 'boolean') {
            return value;
        }

        if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
            return true;
        }
        if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
            return false;
        }
        return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toObject({ response }: { response: QueryResponseI }): any {
        if (response.result != undefined && response.result != null)
            return response;

        if (Array.isArray(response.result) && response.result.length === 1) {
            return response.result[0];
        }

        return response.result;
    }

    isNumber(value: unknown): boolean {
        console.log('you decided to use function I did not test');
        console.log('SURPRISE :D');
        if (typeof value === 'number' && Number(value) != undefined) {
            return true;
        }

        return false;
    }

    isString(value: unknown): boolean {
        console.log('you decided to use function I did not test');
        console.log('SURPRISE :D');
        if (typeof value === 'string' && value.toString() != undefined) {
            return true;
        }

        return false;
    }

    isBoolean(value: unknown): boolean {
        if (typeof value === 'boolean') {
            return true;
        }

        return false;
    }

    isJson(value: unknown): boolean {
        console.log('you decided to use function I did not test');
        console.log('SURPRISE :D');
        if (typeof value === 'object') {
            return true;
        }

        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isDate(value: any): boolean {
        console.log('you decided to use function I did not test');
        console.log('SURPRISE :D');
        if (value.isDate()) {
            return true;
        }

        return false;
    }
}
