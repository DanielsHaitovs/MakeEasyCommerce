import { OrderDirection } from '@src/mec/enum/query/query.enum';

export interface QueryFilterI {
    pagination: {
        page: number;
        limit: number;
    };
    order: {
        by: string;
        direction: OrderDirection;
    };
}
