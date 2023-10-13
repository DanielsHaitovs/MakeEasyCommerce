import { ApiProperty } from '@nestjs/swagger';
import { AttributeType } from '@src/base/enum/attributes/attribute-type.enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
// @ApiProperty()
// @IsNotEmpty()
// @IsEnum(ProductTypes)
// appliesTo: ProductTypes[];
export class AttributeDescriptionDto {
    @ApiProperty({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @IsBoolean()
    isArray: boolean;

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

    @ApiProperty({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;

    @ApiProperty({
        enum: AttributeType,
    })
    @IsNotEmpty()
    @IsEnum(AttributeType)
    dataType: string;
}
