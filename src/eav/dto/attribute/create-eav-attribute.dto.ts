import { ApiProperty } from '@nestjs/swagger';
import { EavDescriptionDto } from '../create-eav.dto';
import { IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { ToBoolean } from '@src/eav/decorator/eav-attribute-rule.decorator';

export class AttributeRuleDto {
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
