import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributeOptionsDto } from './create-option.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAttributeOptionsDto extends CreateAttributeOptionsDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
