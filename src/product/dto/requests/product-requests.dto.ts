import {
    IsBoolean,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { PaginationDto } from '@src/base/dto/query-filters/query.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SimpleProductFilterByRelation {
    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    includeRules: boolean;

    @ApiProperty({ type: Boolean })
    @IsOptional()
    @IsBoolean()
    includeOptions: boolean;
}

export class SimpleProductFilterByValue {
    @ApiProperty({ type: String, title: 'SimpleProduct Code' })
    @IsOptional()
    @IsString()
    code: string;

    @ApiProperty({ type: String, title: 'SimpleProduct option value' })
    @IsOptional()
    @IsString()
    value: string;
}

export class SimpleProductConditionsDto extends PaginationDto {
    @ApiProperty({ type: SimpleProductFilterByRelation })
    @ValidateNested({ each: true })
    relations: SimpleProductFilterByRelation;

    @ApiProperty({ type: SimpleProductFilterByValue })
    @ValidateNested({ each: true })
    filter: SimpleProductFilterByValue;
}
