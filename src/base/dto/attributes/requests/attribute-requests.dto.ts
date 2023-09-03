import { ApiProperty } from '@nestjs/swagger';
// import { ToBoolean } from '@src/attribute/decorator/eav-attribute-rule.decorator';
import { PaginationDto } from '@src/base/dto/query-filters/query.dto';
import { Transform, TransformFnParams } from 'class-transformer';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Any } from 'typeorm';
export function ToBoolean(): (target: any, key: string) => void {
    return Transform((params: TransformFnParams) => {
        const { value } = params;
        if (typeof value === 'boolean') {
            return value;
        }
        if (value?.toString()?.toLowerCase() === 'false') {
            return false;
        }
        if (value?.toString()?.toLowerCase() === 'true') {
            return true;
        }
        return undefined;
    });
}
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
