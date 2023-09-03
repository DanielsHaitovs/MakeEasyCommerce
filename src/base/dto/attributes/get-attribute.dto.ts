import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { AttributeRulesDto } from './create-attribute.dto';
import { AttributeDescriptionDto, AttributeOptionsDto } from './attribute.dto';

export class GetAttributeRulesDto extends AttributeRulesDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetAttributeOptionsDto extends AttributeOptionsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetUpdatedOptionsDto {
    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    updatedOptions: GetAttributeOptionsDto[];

    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    newOptions: GetAttributeOptionsDto[];

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    newOptionsIds: number[];
}

export class GetAttributeShortDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: AttributeDescriptionDto })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;
}

export class GetAttributeDto extends GetAttributeShortDto {
    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: GetAttributeOptionsDto[];

    @ApiProperty({ type: GetAttributeRulesDto })
    @ValidateNested({ each: true })
    rule: GetAttributeRulesDto;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    options_ids: number[];
}
