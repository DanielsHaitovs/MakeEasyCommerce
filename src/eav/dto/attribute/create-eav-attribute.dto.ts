import { ApiProperty } from '@nestjs/swagger';
import { EAVDescriptionDto, EavDto } from '../create-eav.dto';
import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';

export class EAVAttributeRuleDto {
    @ApiProperty({ default: true })
    @IsNotEmpty()
    @IsBoolean()
    useInCatalog: boolean;

    @ApiProperty({ default: true })
    @IsNotEmpty()
    @IsBoolean()
    useInListing: boolean;

    @ApiProperty({ default: true })
    @IsNotEmpty()
    @IsBoolean()
    useInLayeredNavigation: boolean;

    @ApiProperty({ default: true })
    @IsNotEmpty()
    @IsBoolean()
    useInFilter: boolean;

    @ApiProperty({ default: true })
    @IsNotEmpty()
    @IsBoolean()
    useInOptionFilter: boolean;

    @ApiProperty({ default: true })
    @IsNotEmpty()
    @IsBoolean()
    useInSort: boolean;

    @ApiProperty({ default: true })
    @IsNotEmpty()
    @IsBoolean()
    useInSearch: boolean;

    @ApiProperty({ default: true })
    @IsNotEmpty()
    @IsBoolean()
    useInPromo: boolean;

    @ApiProperty({ default: true })
    @IsNotEmpty()
    @IsBoolean()
    useInReport: boolean;
}

export class EAVAttributeDto {
    @ApiProperty({ type: EAVDescriptionDto })
    @ValidateNested()
    attribute: EAVDescriptionDto;
    // @ApiProperty()
    // @IsString()
    // dataType: string;
    @ApiProperty({ type: EAVAttributeRuleDto })
    @ValidateNested()
    attributeRule: EAVAttributeRuleDto;
}

export class CreateEavAttribute extends EAVAttributeDto {
    @ApiProperty({ type: EavDto })
    @ValidateNested()
    eav: EavDto;
}
