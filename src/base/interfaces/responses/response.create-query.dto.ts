export interface QueryBaseResponseInterface {
    error?: {
        message: string;
        in: string;
    };
}

export interface QueryResponseInterface {
    message?: string;
    result?: any | any[];
    error?: {
        message: string;
        in: string;
    };
}
