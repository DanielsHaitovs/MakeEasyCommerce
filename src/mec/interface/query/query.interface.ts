import { OrderDirection } from '@src/mec/enum/query/query.enum';

export interface QueryWhere {
    [key: string]: string | number;
    alias: string;
}
export interface QueryResponseI<T> {
    status: string;
    message?: string;
    result?: T[];
    error?: {
        message: string;
        in: string;
    };
}

export interface QueryErrorResponseI {
    status: string;
    message?: string;
    error: {
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

export interface LogI {
    path: string;
    action: string;
    // name: string;
}
