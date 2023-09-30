import {
    CreateOptionDto,
    CreateOptionsDto,
} from '@src/attribute/relations/option/dto/create-option.dto';
import { GetOptionDto } from '@src/attribute/relations/option/dto/get-option.dto';
import {
    UpdateManyOptionsDto,
    UpdateOptionDto,
} from '@src/attribute/relations/option/dto/update-option.dto';

export class CreateStoreViewOptionDto extends CreateOptionDto {}
export class CreateStoreViewOptionsDto extends CreateOptionsDto {}

export class GetStoreViewOptionDto extends GetOptionDto {}

export class UpdateStoreViewOptionDto extends UpdateOptionDto {}
export class UpdateStoreViewManyOptionsDto extends UpdateManyOptionsDto {}
