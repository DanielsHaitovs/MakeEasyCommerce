import { QueryResponseI } from '@src/mec/interface/query/query.interface';

export class ErrorHandlerService {
    handleError({
        e,
        message,
        where,
        status,
    }: {
        e: Error;
        message: string;
        where: string;
        status: string;
    }): QueryResponseI {
        return {
            status,
            message,
            error: {
                message: e.message,
                in: where,
            },
        };
    }
}
