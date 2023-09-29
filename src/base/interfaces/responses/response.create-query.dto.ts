export interface QueryBaseResponseInterface {
    error?: {
        message: string;
        in: string;
    };
}

export interface QueryResponseInterface {
    status: string;
    message: string;
    result?: any | any[];
    error?: {
        message: string;
        in: string;
    };
}
