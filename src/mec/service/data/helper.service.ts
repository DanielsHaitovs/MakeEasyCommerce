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

    /**
     * This method is used to retrieve a single rule from a response.
     *
     * @param {Object} response - An object of type RuleResponseI containing the response to parse.
     *
     * @returns {GetRuleI} - Returns an object of type GetRuleI.
     * If the response contains an array of results, the method returns the first result in the array.
     * If the response contains a single result, the method returns the result.
     * If an error occurs while parsing the response, the method returns null.
     */
    toSingle<T>({ response }: { response: QueryResponseI<T> }): T {
        if (response.result === undefined) return null;

        try {
            // Extract the result from the response
            const { result } = response;

            // If the result is an array, return the first element in the array
            if (result != undefined && Array.isArray(result)) {
                return result.shift();
            }

            // If the result is not an array, return the result
            return result as T;
        } catch {
            // If an error occurs, return null
            return null;
        }
    }
}
