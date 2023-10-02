import { PartialType } from '@nestjs/swagger';
import {
    CreateStoreAttributeDto,
    CreateStoreAttributeShortDto,
} from './create-attribute.dto';

export class UpdateStoreAttributeDto extends PartialType(
    CreateStoreAttributeDto,
) {}

export class UpdateStoreAttributeShortDto extends CreateStoreAttributeShortDto {}
