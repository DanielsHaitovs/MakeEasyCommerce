import { ApiProperty } from '@nestjs/swagger';
import { AttributeDescriptionDto } from '../../base/attribute/attribute.base.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { GetRulesDto } from '../rule/get-rule.attribute.dto';
import {
    GetOptionsDto,
    GetSimpleProductOption,
} from '../option/get-option.attribute.dto';

export class GetAttributeShortDto extends AttributeDescriptionDto {
    @ApiProperty({
        title: 'Product Attribute Id',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Get Attribute Rule',
        type: GetRulesDto,
    })
    @ValidateNested({ each: true })
    rules: GetRulesDto;
}

export class GetAttributeDto extends GetAttributeShortDto {
    @ApiProperty({
        title: 'Get Attribute Options List',
        type: GetOptionsDto,
    })
    @ValidateNested({ each: true })
    options: GetOptionsDto;
}

export class GetSimpleProductAttributes extends GetAttributeShortDto {
    @ApiProperty({
        title: 'Get Attribute Options List',
        type: [GetSimpleProductOption],
    })
    @ValidateNested({ each: true })
    options: GetSimpleProductOption[];
}
