export class AttributeError {
    message: string;
    result: {
        message: string;
        status: number;
    };
}

export class AttributeSuccess {
    message: string;
    status: number;
    result: any | any[];
}

export class AttributeResponse {
    result: AttributeSuccess | AttributeError;
}
