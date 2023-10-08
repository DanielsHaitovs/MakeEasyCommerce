import { ApiProperty } from '@nestjs/swagger';
import { AttributeDescriptionDto } from '@src/attribute/dto/attribute.dto';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    ValidateNested,
} from 'class-validator';
import { StoreRuleBaseDto } from './store-attribute/rule/create-attribute-rule.dto';

export class CreateStoreAttributeDescriptionDto {
    @ApiProperty({
        type: AttributeDescriptionDto,
    })
    @IsNotEmpty()
    description: AttributeDescriptionDto;
}

export class CreateStoreAttributeShortDto {
    @ApiProperty({
        title: 'Store View ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;

    @ApiProperty({
        title: 'Use default',
        type: Boolean,
        nullable: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    useDefault: boolean;

    @ApiProperty({
        title: 'Default Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    defaultAttribute: number;

    @ApiProperty({
        title: 'Store Attribute Data',
        type: CreateStoreAttributeDescriptionDto,
        nullable: false,
    })
    @IsNotEmpty()
    storeAttribute: CreateStoreAttributeDescriptionDto;

    @ApiProperty({
        title: 'Store Attribute Data',
        type: StoreRuleBaseDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    rule: StoreRuleBaseDto;
}

export class CreateStoreAttributeDto extends CreateStoreAttributeShortDto {}
