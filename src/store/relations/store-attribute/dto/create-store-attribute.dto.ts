import { ApiProperty } from '@nestjs/swagger';
import { AttributeDescriptionDto } from '@src/attribute/dto/attribute.dto';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    ValidateNested,
} from 'class-validator';
import { StoreRuleBaseDto } from './store-attribute/rule/create-attribute-rule.dto';
import { OptionDto } from '@src/attribute/relations/option/dto/option.dto';

export class CreateStoreAttributeOptionDto extends OptionDto {
    @ApiProperty({
        title: 'Parent Attribute Option ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    parentOption: number;

    storeAttribute: number;
    storeView: number;
}

export class CreateStoreAttributeDescriptionShortDto {
    @ApiProperty({
        type: AttributeDescriptionDto,
    })
    @IsNotEmpty()
    description: AttributeDescriptionDto;
}

export class CreateStoreAttributeDescriptionDto extends CreateStoreAttributeDescriptionShortDto {
    @ApiProperty({
        title: 'Store View Options',
        type: [CreateStoreAttributeOptionDto],
        nullable: true,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    storeOptions: CreateStoreAttributeOptionDto[];
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
        type: CreateStoreAttributeDescriptionShortDto,
        nullable: false,
    })
    @IsNotEmpty()
    storeAttribute: CreateStoreAttributeDescriptionShortDto;

    @ApiProperty({
        title: 'Store Attribute Data',
        type: StoreRuleBaseDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    rule: StoreRuleBaseDto;
}

export class CreateStoreAttributeDto extends CreateStoreAttributeShortDto {
    @ApiProperty({
        title: 'Store Attribute Data',
        type: CreateStoreAttributeDescriptionDto,
        nullable: false,
    })
    @IsNotEmpty()
    storeAttribute: CreateStoreAttributeDescriptionDto;
}
