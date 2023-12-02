import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { AttributeProperties } from '@src/attribute/enum/attribute.enum';
import { FilterRequestDto } from '@src/mec/dto/filter/query-filter.dto';

export class AttributeSelectDto {
    @ApiProperty({
        title: 'Select Attribute Properties',
        enum: AttributeProperties,
        isArray: true,
        default: AttributeProperties.Id,
        required: false,
    })
    @IsOptional()
    @ValidateNested({ each: true })
    select: AttributeProperties[];
}

export class AttributeWhereDto {
    @ApiProperty({
        title: 'Where Rule Properties',
        description:
            'Option to include more then 1 of existing rule properties into filtering using same boolean from "whereValue"',
        nullable: false,
        enum: AttributeProperties,
        default: '',
        isArray: true,
        required: false,
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectWhere: AttributeProperties[];
}

export class AttributeRelationSelectDto {
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

export class AttributeQueryFilterDto extends FilterRequestDto {
    @ApiProperty({
        title: 'Attribute ID(s)',
        type: [Number],
        nullable: true,
        default: null,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    valueIds: number[];

    @ApiProperty({
        title: 'Select Attribute Properties',
        isArray: true,
        enum: AttributeProperties,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    selectProp: AttributeProperties[];

    @ApiProperty({
        title: 'Join Options Relation for Attribute Query',
        nullable: false,
        default: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    joinOptions: boolean;

    @ApiProperty({
        title: 'Join Rule Relation for Attribute Query',
        nullable: false,
        default: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    joinRule: boolean;

    @ApiProperty({
        title: 'Is Active',
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        title: 'Is Required',
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isRequired: boolean;
}
