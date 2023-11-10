import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributeShortDto } from './create-attribute.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetAttributeShortDto extends CreateAttributeShortDto {
    @ApiProperty({
        title: 'Attribute Id',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetAttributeDto extends GetAttributeShortDto {}
