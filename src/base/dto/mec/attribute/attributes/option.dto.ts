import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OptionDto {
    @ApiProperty({
        title: 'Attribute Option Value',
        type: JSON,
        nullable: false,
    })
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;
}
