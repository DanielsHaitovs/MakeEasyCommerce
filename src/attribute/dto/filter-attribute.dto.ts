import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { AttributeProperties } from '@src/attribute/enum/attribute.enum';
import { QueryFilterDto } from '@src/mec/dto/query/filter.dto';

export class AttributeSelectDto {
    @ApiProperty({
        title: 'Select Attribute Properties',
        enum: AttributeProperties,
        isArray: true,
        default: AttributeProperties.Id,
        required: false
    })
    @IsOptional()
    @ValidateNested({ each: true })
    select: AttributeProperties[];
}

export class AttributeWhereDto {
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

export class AttributeRelationSelectDto {
    @ApiProperty({
        title: 'Join Options Relation for Attribute Query',
        nullable: false,
        required: false,
        default: false
    })
    joinOptions: boolean;

    @ApiProperty({
        title: 'Join Rule Relation for Attribute Query',
        nullable: false,
        default: false,
        required: false
    })
    joinRule: boolean;
}

export class AttributeQueryFilterDto extends QueryFilterDto {
    @ApiProperty({
        title: 'Attribute ID(s)',
        type: Number,
        isArray: true,
        nullable: true,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    valueIds: number[];

    @ApiProperty({
        title: 'Select Attribute Properties',
        enum: AttributeProperties,
        isArray: true,
        nullable: true,
        required: false
    })
    @IsOptional()
    @ValidateNested({ each: true })
    selectProp: AttributeProperties[];

    @ApiProperty({
        title: 'Join Options Relation for Attribute Query',
        nullable: false,
        default: false,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    joinOptions: boolean;

    @ApiProperty({
        title: 'Join Rule Relation for Attribute Query',
        nullable: false,
        default: false,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    joinRule: boolean;

    @ApiProperty({
        title: 'Is Active',
        nullable: true,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        title: 'Is Required',
        nullable: true,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    isRequired: boolean;
}
