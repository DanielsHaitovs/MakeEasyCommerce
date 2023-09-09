import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttributeOptionDto {
    @ApiProperty()
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;
}

export class GetAttributeOptionDto extends AttributeOptionDto {
    @ApiProperty({
        title: 'Attribute Option Id',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
