import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributeOptionsDto } from './create-option.dto';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { AttributeShortDescriptionDto } from '../../base/attributes/attribute-base.dto';
import { GetAttributeDto } from '../attribute/get-attribute.dto';
import { GetSimpleProductDto } from '../../product-types/simple/get-simple-product.dto';
import { SimpleProduct } from '@src/product/entities/products/types/simple-product.entity';

export class GetAttributeOptionsDto extends CreateAttributeOptionsDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetAttributeRelationsOptionsDto extends CreateAttributeOptionsDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    parentAttributeId: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    parentOptionId: number;
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

export class GetProductAttributeOptionsList {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: AttributeShortDescriptionDto })
    @ValidateNested({ each: true })
    description: AttributeShortDescriptionDto;

    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: GetAttributeOptionsDto[];
}

export class GetMappedAttributeOptionsDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({ type: Boolean })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;

    @ApiProperty({ type: GetAttributeRelationsOptionsDto })
    @ValidateNested({ each: true })
    options: GetAttributeRelationsOptionsDto;
}
