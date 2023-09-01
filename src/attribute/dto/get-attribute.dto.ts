import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { AttributeRuleDto } from './create-attribute.dto';
import { AttributeDescriptionDto, AttributeOptionsDto } from './attribute.dto';

export class GetAttributeRuleDto extends AttributeRuleDto {
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

    @ApiProperty({ type: GetAttributeRuleDto })
    @ValidateNested({ each: true })
    rule: GetAttributeRuleDto;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    options_ids: number[];
}
