import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import {
    CreateStoreAttributeDescriptionDto,
    CreateStoreAttributeShortDto,
} from './create-store-attribute.dto';

export class GetStoreAttributeDescriptionDto extends CreateStoreAttributeDescriptionDto {
    @ApiProperty({
        title: 'ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetStoreAttributeShortDto extends CreateStoreAttributeShortDto {
    @ApiProperty({
        title: 'ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetStoreAttributeDto extends GetStoreAttributeShortDto {}
