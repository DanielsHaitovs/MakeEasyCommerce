import { ApiProperty } from '@nestjs/swagger';
import { AttributeType } from '@src/mec/enum/attribute/attribute-type.enum';
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsString,
    ValidateNested,
} from 'class-validator';

export class DetailsDto {
    @ApiProperty({
        title: 'Attribute Description',
        type: String,
        nullable: false,
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        title: 'Attribute Is Array',
        type: Boolean,
        nullable: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    isArray: boolean;

    @ApiProperty({
        title: 'Attribute Data Type',
        enum: AttributeType,
        nullable: false,
        default: AttributeType.JSON,
    })
    @IsNotEmpty()
    @IsEnum(AttributeType)
    dataType: AttributeType;

    // @ApiProperty({
    //     title: 'Attribute Description',
    //     type: String,
    //     nullable: false,
    // })
    // @IsNotEmpty()
    // @IsEnum(ProductTypes)
    // appliesTo: ProductTypes[];
}

export class AttributeDetailsDto {
    @ApiProperty({
        title: 'Attribute Details',
        type: DetailsDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    details: DetailsDto;
}

export class AttributeDto extends AttributeDetailsDto {
    @ApiProperty({
        title: 'Is Attribute Active',
        type: Boolean,
        default: false,
        nullable: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        title: 'Attribute Name',
        type: String,
        nullable: false,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        title: 'Attribute Code',
        type: String,
        nullable: false,
    })
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({
        title: 'Is Attribute Required',
        type: Boolean,
        default: false,
        nullable: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;
}
