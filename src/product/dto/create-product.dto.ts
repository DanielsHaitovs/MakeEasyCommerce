import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '../enum/product.enum';
import { Type } from '@nestjs/class-transformer';
import { CreateAttributeDto } from '@src/attribute/dto/create-attribute.dto';

export class ProductBaseDto {
    @ApiProperty({
        title: 'Active Product',
        description: 'Is Product Active',
        type: Boolean,
        nullable: false,
        default: false
    })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        title: 'Stock Status',
        description: 'Is Product in Stock',
        type: Boolean,
        nullable: false,
        default: false
    })
    @IsNotEmpty()
    @IsBoolean()
    inStock: boolean;

    @ApiProperty({
        title: 'Product Name',
        description: 'Product Name',
        type: String,
        nullable: false,
        default: false
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        title: 'Product Sku',
        description: 'Product Stock Keeping Unit',
        type: String,
        nullable: false,
        default: false
    })
    @IsNotEmpty()
    @IsString()
    sku: string;

    @ApiProperty({
        title: 'Product Quantity',
        description: 'Amount of product left in stock',
        type: Number,
        nullable: false,
        default: false
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({
        title: 'Product Type',
        description: '',
        enum: ProductType,
        default: ProductType.Simple,
        nullable: false
    })
    @IsNotEmpty()
    @IsEnum(ProductType)
    type: number;

    @ApiProperty({
        title: 'Product Description',
        description: 'Product Detailed Information',
        type: String,
        nullable: true,
        default: false
    })
    @IsString()
    description: string;
}

export class CreateProductDto extends ProductBaseDto {}

export class CreateProductAttributeDto {
    @ApiProperty({
        title: 'Product Attributes Ids',
        description: 'Product Attributes Ids',
        type: CreateAttributeDto,
        isArray: true,
        nullable: false,
        default: false
    })
    @ValidateNested({ each: true })
    @Type(() => CreateAttributeDto)
    attributes: CreateAttributeDto[];
}
