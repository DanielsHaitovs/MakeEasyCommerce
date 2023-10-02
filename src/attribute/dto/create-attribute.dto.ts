import { ApiProperty } from '@nestjs/swagger';
import { AttributeDescriptionDto } from './attribute.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateOptionDto } from '../relations/option/dto/create-option.dto';
import { RuleDto } from '../relations/rule/dto/rule-base.dto';

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
        type: RuleDto,
        nullable: false,
    })
    @IsNotEmpty()
    rules: RuleDto;

    @ApiProperty({
        title: 'Create Option(s) for this attribute',
        type: [CreateOptionDto],
    })
    @ValidateNested({ each: true })
    options: CreateOptionDto[];
}
