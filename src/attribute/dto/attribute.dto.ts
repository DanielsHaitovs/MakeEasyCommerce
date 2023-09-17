import { ApiProperty } from '@nestjs/swagger';
import { AttributeType } from '@src/base/enum/attributes/attribute-type.enum';
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

export class AttributeDescriptionDto extends AttributeShortDto {
    @ApiProperty({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @IsBoolean()
    isArray: boolean;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsEnum(ProductTypes)
    // appliesTo: ProductTypes[];
}
