import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateStoreRuleDto } from './attributes/rule/create-store-rule.dto';
import { AttributeDescriptionDto } from '@src/attribute/dto/attribute.dto';

export class CreateAttributeDescriptionDto extends AttributeDescriptionDto {
    @IsOptional()
    @IsNumber()
    storeView: number;
}

export class CreateStoreAttributeShortDto {
    @ApiProperty({
        title: 'To check wether to use default record or not',
        type: Boolean,
        default: true,
        nullable: false,
    })
    @IsBoolean()
    useDefault: boolean;

    @ApiProperty({
        title: 'Default Attribute Id',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;

    @ApiProperty({
        title: 'Parent Store View ID',
        type: Number,
        nullable: false,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;
}

export class CreateStoreAttributeDto extends CreateStoreAttributeShortDto {
    @ApiProperty({
        title: 'Is it still Default?',
        type: Boolean,
        default: false,
        nullable: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    useDefault: boolean;

    @ApiProperty({
        title: 'Create Attribute rule',
        type: CreateStoreRuleDto,
        nullable: true,
    })
    @IsNotEmpty()
    rule: CreateStoreRuleDto;

    @ApiProperty({
        title: 'Attributes data per store View',
        type: CreateAttributeDescriptionDto,
        nullable: true,
    })
    @IsOptional()
    description: CreateAttributeDescriptionDto;
}
