import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AttributeOptionsDto {
    @ApiProperty()
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;
}
