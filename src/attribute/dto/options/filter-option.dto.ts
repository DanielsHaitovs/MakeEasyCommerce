import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { AttributeProperties } from '@src/attribute/enum/attribute.enum';
import { QueryFilterDto } from '@src/mec/dto/query/filter.dto';

export class OptionWhereDto {
    @ApiProperty({
        title: 'Where Rule Properties',
        description: 'Option to include more then 1 of existing rule properties into filtering using same boolean from "whereValue"',
        nullable: false,
        enum: AttributeProperties,
        default: AttributeProperties.Id,
        isArray: true,
        required: false
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectWhere: AttributeProperties[];
}

export class OptionQueryFilterDto extends QueryFilterDto {
    @ApiProperty({
        title: 'Attribute ID(s)',
        type: Number,
        isArray: true,
        nullable: true,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    optionIds: number[];
}
