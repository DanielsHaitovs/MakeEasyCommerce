import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { FilterRequestDto } from '../query-filter.dto';
import { AttributeSelect } from '@src/mec/enum/attribute/attribute.enum';

export class AttributeSelectDto {
    @ApiProperty({
        title: 'Select Attribute Properties',
        enum: AttributeSelect,
        isArray: true,
        default: AttributeSelect.Id,
        required: false,
    })
    @IsOptional()
    @ValidateNested({ each: true })
    select: AttributeSelect[];
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
        enum: AttributeSelect,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    selectProp: AttributeSelect[];

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
