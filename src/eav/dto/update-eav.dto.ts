import { PartialType } from '@nestjs/swagger';
import { CreateEavDto } from './create-eav.dto';

export class UpdateEavDto extends PartialType(CreateEavDto) {}
