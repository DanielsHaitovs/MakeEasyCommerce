import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import {
    CreateOptionDto,
    CreateOptionsDto,
} from '@src/attribute/relations/option/dto/create-option.dto';

export class CreateStoresOption extends CreateOptionDto {
    @ApiProperty({
        title: 'Parent Attribute Option ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedOption: number;
}

export class CreateStoresOptionsDto extends CreateOptionsDto {
    @ApiProperty({
        title: 'Parent Attribute Option ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedOption: number;
}
