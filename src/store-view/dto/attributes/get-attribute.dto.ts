import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    ValidateNested,
} from 'class-validator';
import { GetAttributeShortDto } from '@src/attribute/dto/get-attribute.dto';
import { GetStoreOptionDto } from '@src/attribute/relations/option/dto/get-option.dto';
import { GetRulesDto } from '@src/attribute/relations/rule/dto/get-rule.dto';

export class GetStoreAttributeShort {
    @ApiProperty({
        title: 'Is Default',
        type: Boolean,
        default: true,
        nullable: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    useDefault: boolean;

    @ApiProperty({
        title: 'Store View ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;

    @ApiProperty({
        title: 'Store Attributes Data',
        type: [GetAttributeShortDto],
    })
    @ValidateNested({ each: true })
    attributes: GetAttributeShortDto[];

    @ApiProperty({
        title: 'Attribute Id',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;
}

export class GetStoreAttribute extends GetStoreAttributeShort {
    @ApiProperty({
        title: 'Get Attribute Rules',
        type: GetRulesDto,
    })
    @ValidateNested({ each: true })
    rules: GetRulesDto;

    @ApiProperty({
        title: 'Get Store Option(s) for this attribute',
        type: [GetStoreOptionDto],
    })
    @ValidateNested({ each: true })
    options: GetStoreOptionDto[];

    optionsIds: number[];
}
