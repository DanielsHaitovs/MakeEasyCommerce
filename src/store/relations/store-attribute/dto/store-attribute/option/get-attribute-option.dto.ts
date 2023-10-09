import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import {
    CreateStoreOptionDto,
    StoreOptionBody,
} from './create-attribute-option.dto';

export class GetStoreOptionDto extends CreateStoreOptionDto {
    @ApiProperty({
        title: 'Attribute Option Id',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetManyStoreOptionsDto {
    @ApiProperty({
        title: 'Attribute Option Id',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeAttribute: number;

    @ApiProperty({
        title: 'Parent Store View ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    storeView: number;

    @ApiProperty({
        title: 'Store Option(s) Data',
        type: [StoreOptionBody],
    })
    @ValidateNested({ each: true })
    options: StoreOptionBody[];
}
