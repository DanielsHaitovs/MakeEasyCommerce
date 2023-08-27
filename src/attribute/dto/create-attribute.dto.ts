import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    ValidateNested,
} from 'class-validator';

export class AttributeOptionsDto {
    @ApiProperty({ type: JSON })
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;
}

export class AttributeDescriptionDto {
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
}

export class CreateAttributeDto {
    @ApiProperty({ type: AttributeDescriptionDto })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;

    @ApiProperty({ type: [AttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: AttributeOptionsDto[];
}
