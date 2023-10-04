import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    ValidateNested,
} from 'class-validator';
import { AttributeDescriptionDto } from '@src/attribute/dto/attribute.dto';
import { GetStoreRuleDto } from './attributes/rule/get-store-rule.dto';

export class GetAttributeBaseDto {
    @ApiProperty({
        title: 'Base data for Store Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Main Attribute Data',
        type: AttributeDescriptionDto,
    })
    @IsNotEmpty()
    description: AttributeDescriptionDto;
}

export class GetAttributeDescriptionDto extends GetAttributeBaseDto {
    @ApiProperty({
        title: 'Related Store View ID',
        type: Number,
        nullable: true, // later change to false
    })
    @IsNumber()
    storeView: number;
}

export class GetStoreAttributeShortDto {
    @ApiProperty({
        title: 'Store Attribute data ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'To check wether to use default record or not',
        type: Boolean,
        default: true,
        nullable: false,
    })
    @IsBoolean()
    useDefault: boolean;

    // @ApiProperty({
    //     title: 'Parent Store View ID',
    //     type: Number,
    //     nullable: false,
    //     required: true,
    // })
    // @IsNotEmpty()
    // @IsNumber()
    // storeView: number;

    @ApiProperty({
        title: 'Default Attribute Id',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;
}

export class CreateStoreAttributeDto extends GetStoreAttributeShortDto {
    @ApiProperty({
        title: 'Is Default',
        type: Boolean,
        default: false,
        nullable: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    useDefault: boolean;

    @ApiProperty({
        title: 'Create Attribute rule',
        type: GetStoreRuleDto,
        nullable: true,
    })
    @IsNotEmpty()
    rule: GetStoreRuleDto;

    @ApiProperty({
        title: 'Attributes data per store View',
        type: GetAttributeBaseDto,
        nullable: true,
    })
    @ValidateNested({ each: true })
    attributes: GetAttributeBaseDto;
}
