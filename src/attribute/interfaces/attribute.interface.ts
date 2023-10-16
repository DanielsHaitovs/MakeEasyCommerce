import { AttributeType } from "@src/base/enum/attributes/attribute-type.enum";
import { CreateAttributeRuleI, GetAttributeOptionI, GetAttributeRuleI } from "./attributes/attributes.interface";
import { QueryResponseI } from "@src/base/interface/response/response.interface";

export interface AttributeDetailsI {
    description: string;
    isArray: boolean;
    dataType: AttributeType;
    // appliesTo: ProductTypes[];
}

// export interface AttributeDescriptionShortI {
//     isActive: boolean;
//     name: string;
//     code: string;
//     isRequired: boolean;
// }


// export interface AttributeDescriptionI extends AttributeDescriptionShortI {
//     details: AttributeDetailsI;
// }

// export interface CreateAttributeShortI extends AttributeDescriptionI {
//     rule: CreateRuleAttributeI;
// }

// export interface CreateAttributeI extends CreateAttributeShortI {
//     options: CreateOptionAttributeI[];
// }

// export interface GetAttributeShortI extends AttributeDescriptionI{
//     id: number;
//     rule: GetAttributeRuleI;
// }

// export interface GetAttributeI extends GetAttributeShortI {
//     options: GetOptionAttributeI[];
//     optionsIds?: number[];
// }

export interface CreateAttributeShortI {
    isActive: boolean;
    name: string;
    code: string;
    isRequired: boolean;
    rule: CreateAttributeRuleI
    details: AttributeDetailsI;
}

export interface GetAttributeShortI extends CreateAttributeShortI {
    rule: GetAttributeRuleI;
    id: number;
}

export interface GetAttributeI extends GetAttributeShortI {
    options: GetAttributeOptionI[];
    optionsIds: number[];
}

export interface AttributeShortResponseI extends QueryResponseI {
    status: string;
    message: string;
    result?: GetAttributeShortI | GetAttributeShortI[];
}

export interface AttributeResponseI extends AttributeShortResponseI {
    result?: GetAttributeI | GetAttributeI[];
}

export interface AttributeOptionResponseI extends QueryResponseI {
    result?: GetAttributeOptionI | GetAttributeOptionI[];
}