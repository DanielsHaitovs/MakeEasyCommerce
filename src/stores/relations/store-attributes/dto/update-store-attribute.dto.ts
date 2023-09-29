import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreAttributeDto } from './create-store-attribute.dto';

export class UpdateStoreAttributeDto extends PartialType(
    CreateStoreAttributeDto,
) {}
