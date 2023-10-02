import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import {
    UpdateManyOptionsDto,
    UpdateOptionDto,
} from '@src/attribute/relations/option/dto/update-option.dto';

export class UpdateStoreOptionDto extends UpdateOptionDto {
    @ApiProperty({
        title: 'Parent Attribute Option ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedOption: number;
}

export class UpdateStoreManyOptionsDto extends UpdateManyOptionsDto {
    @ApiProperty({
        title: 'Parent Attribute Option ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedOption: number;
}
