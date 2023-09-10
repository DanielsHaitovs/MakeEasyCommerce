import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OptionValueDto {
    @ApiProperty()
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;
}
