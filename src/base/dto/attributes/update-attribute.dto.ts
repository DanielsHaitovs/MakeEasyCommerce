import { ApiProperty } from '@nestjs/swagger';
import {
    GetAttributeOptionsDto,
    GetAttributeRulesDto,
} from './get-attribute.dto';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { AttributeDescriptionDto, AttributeOptionsDto } from './attribute.dto';
import { AttributeRulesDto } from './create-attribute.dto';

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

    @ApiProperty({ type: GetAttributeRulesDto })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    rule: GetAttributeRulesDto;

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

export class UpdateOptionDto extends AttributeOptionsDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    attributeId: number;
}

export class UpdateRulesDto extends AttributeRulesDto {
    @ApiProperty({ type: Number })
    @IsOptional()
    @IsNumber()
    id: number;
}
