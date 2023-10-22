import { PartialType } from '@nestjs/swagger';
import {
    CreateAttributeDto,
    CreateAttributeShortDto,
} from './create-attribute.dto';

export class UpdateAttributeShortDto extends PartialType(
    CreateAttributeShortDto,
) {}
export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {}
