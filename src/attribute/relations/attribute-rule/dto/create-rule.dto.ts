import { ApiProperty } from '@nestjs/swagger';
import { RuleDto } from '@src/base/dto/mec/attribute/attributes/rule.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRuleDto extends RuleDto {}
