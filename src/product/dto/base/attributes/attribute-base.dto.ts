import { ApiProperty } from '@nestjs/swagger';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class AttributeShortDescriptionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;
}

export class AttributeDescriptionDto extends AttributeShortDescriptionDto {
    @ApiProperty({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dataType: string;

    @ApiProperty()
    @IsBoolean()
    isArray: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ProductTypes)
    appliesTo: ProductTypes[];
}
