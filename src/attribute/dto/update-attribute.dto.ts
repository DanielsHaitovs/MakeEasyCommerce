import { PartialType } from '@nestjs/swagger';
import { CreateAttributeDto } from './create-attribute.dto';
import { AttributeDescriptionDto } from './attribute.dto';

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {}

export class UpdateAttributeShortDto extends AttributeDescriptionDto {}
