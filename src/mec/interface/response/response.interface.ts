export interface QueryResponseI {
    status: string;
    message: string;
    result?: any | any[];
    error?: {
        message: string;
        in: string;
    };
}
