import { ApiProperty } from '@nestjs/swagger';
import { AttributeDescriptionDto } from '../base/attribute/attribute.base.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { AttributeOptionDto } from './options/option.attribute.dto';
import { RuleDto } from './rules/rule.attribute.dto';

export class AttributeDto {
    @ApiProperty({
        title: 'Main Attribute data and Description',
        type: AttributeDescriptionDto,
    })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;

    // parent: GetAttributeDto

    @ApiProperty({
        title: 'Attribute Options Dto',
        type: [AttributeOptionDto],
    })
    @ValidateNested({ each: true })
    options: AttributeOptionDto[];

    @ApiProperty({
        title: 'Attribute Options Ids',
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    optionsIds: number[];

    @ApiProperty({
        title: 'Attribute Rules Dto',
        type: [RuleDto],
    })
    @ValidateNested({ each: true })
    rules: RuleDto;
}
