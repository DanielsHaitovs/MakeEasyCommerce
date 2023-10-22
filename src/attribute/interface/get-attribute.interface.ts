import { QueryResponseI } from '@src/mec/interface/response/response.interface';
import { CreateAttributeShortDto } from '../dto/create-attribute.dto';
import { GetAttributeRuleI } from './attributes/rule/attribute-rule.interface';

export interface GetAttributeShortI extends CreateAttributeShortDto {
    id: number;
}

export interface GetAttributeI extends GetAttributeShortI {
    rule: GetAttributeRuleI;
}

export interface AttributeResponseI extends QueryResponseI {
    result?: GetAttributeI | GetAttributeI[];
}
