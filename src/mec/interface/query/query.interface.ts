import { OrderDirection } from '@src/mec/enum/query/query.enum';

export interface QueryResponseI {
    status: string;
    message: string;
    result?: unknown | unknown[];
    error?: {
        message: string;
        in: string;
    };
}

export interface QueryFilterI {
    many?: boolean;
    pagination: {
        page: number;
        limit: number;
    };
    order: {
        by: string;
        direction: OrderDirection;
    };
}
