import { ApiProperty } from '@nestjs/swagger';
import { EavDescriptionDto } from '../create-eav.dto';
import { IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { ToBoolean } from '@src/eav/decorator/eav-attribute-rule.decorator';

export class AttributeRuleDto {
    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    useInCatalog: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    useInListing: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    useInLayeredNavigation: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    useInFilter: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    useInOptionFilter: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    useInSort: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    useInSearch: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    useInPromo: boolean;

    @ApiProperty({ default: true })
    @ToBoolean()
    @IsBoolean()
    useInReport: boolean;
}

export class AttributeDto {
    @ApiProperty({ type: EavDescriptionDto })
    @ValidateNested()
    attribute: EavDescriptionDto;
}

export class CreateAttributeDto extends AttributeDto {
    @ApiProperty({ type: Number })
    @IsNumber()
    parent_eav: number;
}
