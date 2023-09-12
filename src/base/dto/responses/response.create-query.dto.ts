export class QueryBaseResponse {
    error?: {
        message: string;
        in: string;
    };
}

export class QueryResponse {
    result?: any | any[];
    error?: {
        message: string;
        in: string;
    };
}
