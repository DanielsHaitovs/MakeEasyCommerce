import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { GetOptionDto } from '@src/attribute/relations/option/dto/get-option.dto';

export class GetStoreOptionDto extends GetOptionDto {
    @ApiProperty({
        title: 'Parent Attribute Option ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedOption: number;
}
