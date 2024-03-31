import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
    @ApiProperty({
        title: 'Attribute Option',
        nullable: false
    })
    @IsNotEmpty()
    data: string | number | boolean | Date | JSON;
}
