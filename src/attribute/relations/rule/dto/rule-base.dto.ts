import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';

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

export class RuleDto {
    @ApiProperty({
        title: 'Front end Attribute Rule',
        type: RuleBaseDto,
    })
    @ValidateNested({ each: true })
    front: RuleBaseDto;

    @ApiProperty({
        title: 'Front end Attribute Rule',
        type: RuleBaseDto,
    })
    @ValidateNested({ each: true })
    back: RuleBaseDto;
}
