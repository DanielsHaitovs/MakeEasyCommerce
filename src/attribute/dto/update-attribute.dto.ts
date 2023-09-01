import { ApiProperty } from '@nestjs/swagger';
import {
    GetAttributeOptionsDto,
    GetAttributeRuleDto,
} from './get-attribute.dto';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { AttributeDescriptionDto, AttributeOptionsDto } from './attribute.dto';

export class UpdateAttributeDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty({ type: AttributeDescriptionDto })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    description: AttributeDescriptionDto;

    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    options: GetAttributeOptionsDto[];

    @ApiProperty({ type: GetAttributeRuleDto })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    rule: GetAttributeRuleDto;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    options_ids: number[];
}

export class UpdateAttributeOptionsDto extends AttributeOptionsDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id: number;
}
