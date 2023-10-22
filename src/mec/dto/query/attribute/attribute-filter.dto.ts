import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { OrderDto, PaginationDto, QueryFilterDto } from '../query-filter.dto';
import { AttributeSelect } from '@src/mec/enum/attribute/attribute-type.enum';

export class AttributeQueryFilterDto extends QueryFilterDto {
    @ApiProperty({
        title: 'Attribute IDs',
        type: [Number],
        nullable: true,
        default: null,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    attributeIds: number[];

    @ApiProperty({
        title: 'Select Attribute Properties',
        nullable: false,
        enum: AttributeSelect,
        isArray: true,
        default: AttributeSelect.Id,
        required: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    select: AttributeSelect[];

    @ApiProperty({
        title: 'Join Options Relation for Attribute Query',
        nullable: false,
        default: false,
        required: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    joinOptions: boolean;

    @ApiProperty({
        title: 'Join Rule Relation for Attribute Query',
        nullable: false,
        default: false,
        required: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    joinRule: boolean;
}

export class AttributeNonRelationQuery extends QueryFilterDto {
    @ApiProperty({
        title: 'Select Attribute Properties',
        nullable: false,
        enum: AttributeSelect,
        isArray: true,
        default: AttributeSelect.Id,
        required: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    select: AttributeSelect[];
}
