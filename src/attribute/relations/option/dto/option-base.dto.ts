import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AttributeOptionsDto {
    @ApiProperty()
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;
}

export class AssignedOptionsDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty()
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;
}
