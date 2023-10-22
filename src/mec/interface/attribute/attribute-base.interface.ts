import { AttributeType } from '@src/mec/enum/attribute/attribute-type.enum';

export interface AttributeDetailsI {
    description: string;
    isArray: boolean;
    dataType: AttributeType;
}

export interface AttributeShortI {
    isActive: boolean;
    name: string;
    code: string;
    isRequired: boolean;
}

export interface AttributeI extends AttributeShortI {
    details: AttributeDetailsI;
}
