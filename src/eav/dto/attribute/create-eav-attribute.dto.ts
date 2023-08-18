import { ApiProperty } from '@nestjs/swagger';
import { EavDescriptionDto } from '../create-eav.dto';
import { IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { ToBoolean } from '@src/eav/decorator/eav-attribute-rule.decorator';

export class EavAttributeRuleDto {
    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    // @IsBoolean({ each: true })
    useInCatalog: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    // @IsBoolean({ each: true })
    useInListing: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    // @IsBoolean({ each: true })
    useInLayeredNavigation: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    // @IsBoolean({ each: true })
    useInFilter: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    // @IsBoolean({ each: true })
    useInOptionFilter: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    // @IsBoolean({ each: true })
    useInSort: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    // @IsBoolean({ each: true })
    useInSearch: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    // @IsBoolean({ each: true })
    useInPromo: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    // @IsBoolean({ each: true })
    useInReport: boolean;
}

// export class EavAttributeRuleDto {
//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInCatalog: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInListing: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInLayeredNavigation: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInFilter: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInOptionFilter: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInSort: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInSearch: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInPromo: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInReport: boolean;
// }

// export class EavAttributeRuleDto {
//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInCatalog: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInListing: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     @Transform(({ value }) => value === 'true')
//     useInLayeredNavigation: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     useInFilter: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     useInOptionFilter: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     useInSort: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     useInSearch: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     useInPromo: boolean;

//     @ApiProperty({ default: true })
//     @IsNotEmpty()
//     useInReport: boolean;
// }

export class EavAttributeDto {
    @ApiProperty({ type: EavDescriptionDto })
    @ValidateNested()
    attribute: EavDescriptionDto;
    // @ApiProperty({ type: EavAttributeRuleDto })
    // @ValidateNested()
    // attributeRule: EavAttributeRuleDto;
}

export class CreateEavAttributeDto extends EavAttributeDto {
    @ApiProperty({ type: Number })
    @IsNumber()
    parent_eav: number;
}

// export class EavAttributeRuleDto {
//     // @ApiProperty({ default: true })
//     @ApiProperty()
//     @IsNotEmpty()
//     useInCatalog: boolean;

//     // @ApiProperty({ default: true })
//     @ApiProperty()
//     @IsNotEmpty()
//     useInListing: boolean;

//     // @ApiProperty({ default: true })
//     @ApiProperty()
//     @IsNotEmpty()
//     useInLayeredNavigation: boolean;

//     // @ApiProperty({ default: true })
//     @ApiProperty()
//     @IsNotEmpty()
//     useInFilter: boolean;

//     // @ApiProperty({ default: true })
//     @ApiProperty()
//     @IsNotEmpty()
//     useInOptionFilter: boolean;

//     // @ApiProperty({ default: true })
//     @ApiProperty()
//     @IsNotEmpty()
//     useInSort: boolean;

//     // @ApiProperty({ default: true })
//     @ApiProperty()
//     @IsNotEmpty()
//     useInSearch: boolean;

//     // @ApiProperty({ default: true })
//     @ApiProperty()
//     @IsNotEmpty()
//     useInPromo: boolean;

//     // @ApiProperty({ default: true })
//     @ApiProperty()
//     @IsNotEmpty()
//     useInReport: boolean;
// }
