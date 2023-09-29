import { ApiProperty } from '@nestjs/swagger';
import { AttributeDescriptionDto } from './attribute.dto';
import { ValidateNested } from 'class-validator';
import { CreateRulesDto } from '../relations/rule/dto/create-rule.dto';
import { CreateOptionDto } from '../relations/option/dto/create-option.dto';

export class CreateAttributeShortDto {
    @ApiProperty({
        title: 'Main Attribute Data',
        type: AttributeDescriptionDto,
    })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;
}

export class CreateAttributeDto extends CreateAttributeShortDto {
    @ApiProperty({
        title: 'Create Attribute Rules',
        type: CreateRulesDto,
    })
    @ValidateNested({ each: true })
    rules: CreateRulesDto;

    @ApiProperty({
        title: 'Create Option(s) for this attribute',
        type: [CreateOptionDto],
    })
    @ValidateNested({ each: true })
    options: CreateOptionDto[];
}
