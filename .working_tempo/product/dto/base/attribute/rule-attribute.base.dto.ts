import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class RuleBaseDto {
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
