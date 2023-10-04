import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { OptionDto } from '../relations/option/dto/option.dto';
import { AttributeDescriptionDto } from './attribute.dto';
import { GetRuleDto } from '../relations/rule/dto/get-rule.dto';
import { GetOptionDto } from '../relations/option/dto/get-option.dto';

export class GetAttributeOptions {
    @ApiProperty({
        title: 'Attribute ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Attribute Options',
        type: [OptionDto],
    })
    @ValidateNested({ each: true })
    options: OptionDto[];
}

export class GetAttributeShortDto {
    @ApiProperty({
        title: 'Attribute ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Attribute Description',
        type: AttributeDescriptionDto,
    })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;
}

export class GetAttributeDto extends GetAttributeShortDto {
    @ApiProperty({
        title: 'Get Attribute rule',
        type: GetRuleDto,
    })
    @ValidateNested({ each: true })
    rule: GetRuleDto;

    @ApiProperty({
        title: 'Get Option(s) for this attribute',
        type: [GetOptionDto],
    })
    @ValidateNested({ each: true })
    options: GetOptionDto[];

    optionsIds: number[];
}
