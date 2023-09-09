import { ApiProperty } from '@nestjs/swagger';
import { CreateOptionsDto } from '../option/create-option.attribute.dto';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { AttributeDescriptionDto } from '../../base/attribute/attribute.base.dto';
import { CreateRuleDto } from '../rule/create-rule.attribute.dto';

export class CreateAttributeDto extends AttributeDescriptionDto {
    @ApiProperty({
        title: 'Create Options for this Attribute',
        type: CreateOptionsDto,
    })
    @ValidateNested({ each: true })
    options: CreateOptionsDto;

    @ApiProperty({
        title: 'Create Rules for this Attribute',
        type: CreateRuleDto,
    })
    @ValidateNested({ each: true })
    rules: CreateRuleDto;

    @ApiProperty({
        title: 'Parent Attribute ID',
        default: null,
        nullable: true,
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    parentAttributeId: number;
}
