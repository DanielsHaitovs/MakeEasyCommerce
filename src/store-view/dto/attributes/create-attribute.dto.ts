import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    ValidateNested,
} from 'class-validator';

import { CreateAttributeShortDto } from '@src/attribute/dto/create-attribute.dto';
import { CreateRulesDto } from '@src/attribute/relations/rule/dto/create-rule.dto';

export class CreateStoreViewAttributeShortDto extends CreateAttributeShortDto {}

export class CreateStoreAttributeShortDto {
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
        title: 'Parent Store View ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;

    @ApiProperty({
        title: 'Attribute Id',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;
}

export class CreateStoreAttributeDto extends CreateStoreAttributeShortDto {
    @ApiProperty({
        title: 'Attributes data per store View',
        type: [CreateStoreViewAttributeShortDto],
        nullable: true,
    })
    @ValidateNested({ each: true })
    attributes: CreateStoreViewAttributeShortDto[];

    @ApiProperty({
        title: 'Create Store Attribute Rules',
        type: CreateRulesDto,
    })
    @ValidateNested({ each: true })
    rules: CreateRulesDto;

    // @ApiProperty({
    //     title: 'Create Store Option(s) for this store attribute',
    //     type: [CreateStoresOptionsDto],
    // })
    // @ValidateNested({ each: true })
    // options: CreateStoresOptionsDto[];
}
