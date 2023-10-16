import { ApiProperty } from '@nestjs/swagger';
import { AttributeDescriptionDto } from '@src/base/dto/mec/attribute/attribute.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateRuleAttributeDto } from './attributes/rule/create-attribute.rule.dto';
import { CreateOptionAttributeDto } from './attributes/option/create-attribute.option.dto';

export class CreateAttributeShortDto extends AttributeDescriptionDto {
    @ApiProperty({
        title: 'Attribute Rule',
        type: CreateRuleAttributeDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    rule: CreateRuleAttributeDto;
}

export class CreateAttributeDto extends CreateAttributeShortDto {
    @ApiProperty({
        title: 'Attribute Options',
        type: [CreateOptionAttributeDto],
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    options: CreateOptionAttributeDto[];
}
