import { PartialType } from '@nestjs/swagger';
import { AttributeBaseDto } from './create-attribute.dto';

export class UpdateAttributeDto extends PartialType(AttributeBaseDto) {}
