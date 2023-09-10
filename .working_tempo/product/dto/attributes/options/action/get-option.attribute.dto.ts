import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AttributeOptionDto } from '../option.attribute.dto';

export class GetAttributeOptionDto extends AttributeOptionDto {
    @ApiProperty({
        title: 'Attribute Option Id',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
