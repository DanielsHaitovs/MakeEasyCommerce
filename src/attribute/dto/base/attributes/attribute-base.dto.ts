import { ApiProperty } from '@nestjs/swagger';
import { AttributeType } from '@src/base/enum/attributes/attribute-type.enum';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AttributeShortDto {
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

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(AttributeType)
    dataType: AttributeType;
}

export class AttributeDescriptionDto extends AttributeShortDto {
    @ApiProperty({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsBoolean()
    isArray: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ProductTypes)
    appliesTo: ProductTypes[];
}
