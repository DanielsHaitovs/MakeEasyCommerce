import { CreateAttributeShortDto } from '@src/attribute/dto/create-attribute.dto';
import {
    GetAttributeDto,
    GetAttributeOptions,
    GetAttributeShortDto,
} from '@src/attribute/dto/get-attribute.dto';
import {
    UpdateAttributeDto,
    UpdateAttributeShortDto,
} from '@src/attribute/dto/update-attribute.dto';

export class CreateStoreViewAttribute extends CreateAttributeShortDto {}

export class GetStoreViewAttributeOptions extends GetAttributeOptions {}
export class GetStoreViewAttributeShortDto extends GetAttributeShortDto {}
export class GetStoreViewAttributeDto extends GetAttributeDto {}

export class UpdateStoreViewAttributeDto extends UpdateAttributeDto {}
export class UpdateStoreViewAttributeShortDto extends UpdateAttributeShortDto {}
