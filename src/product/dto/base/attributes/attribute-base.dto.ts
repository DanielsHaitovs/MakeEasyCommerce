import { ApiProperty } from '@nestjs/swagger';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AttributeDescriptionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code: string;

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

    @ApiProperty({ type: 'simple-array' })
    @IsNotEmpty()
    @IsEnum(ProductTypes)
    appliesTo: ProductTypes[];
}
