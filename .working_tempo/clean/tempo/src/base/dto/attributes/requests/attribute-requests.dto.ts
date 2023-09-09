import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@src/base/dto/query-filters/query.dto';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

export class AttributeFilterByRelation {
    @ApiProperty({ type: Boolean })
    @IsNotEmpty()
    includeRules: boolean;

    @ApiProperty({ type: Boolean })
    @IsNotEmpty()
    includeOptions: boolean;
}

export class FilterOnlyByRelation extends PaginationDto {
    @ApiProperty({ type: Boolean })
    @IsNotEmpty()
    includeRules: boolean;

    @ApiProperty({ type: Boolean })
    @IsNotEmpty()
    includeOptions: boolean;
}

export class AttributeFilterByValue {
    @ApiProperty({ type: String, title: 'Attribute Code' })
    @IsOptional()
    @IsString()
    code: string;

    @ApiProperty({ type: String, title: 'Attribute option value' })
    @IsOptional()
    @IsString()
    value: string;
}

export class AttributeConditionsDto extends PaginationDto {
    @ApiProperty({ type: AttributeFilterByRelation })
    @ValidateNested({ each: true })
    relations: AttributeFilterByRelation;

    @ApiProperty({ type: AttributeFilterByValue })
    @ValidateNested({ each: true })
    filter: AttributeFilterByValue;
}
