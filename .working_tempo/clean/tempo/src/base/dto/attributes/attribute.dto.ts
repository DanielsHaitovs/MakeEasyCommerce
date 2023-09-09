import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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

export class AttributeOptionsDto {
    @ApiProperty()
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;
}

export class RuleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    useInCatalog: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    useInListing: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    useInLayeredNavigation: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    useInFilter: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    useInOptionFilter: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    useInSort: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    useInSearch: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    useInPromo: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    useInReport: boolean;
}
