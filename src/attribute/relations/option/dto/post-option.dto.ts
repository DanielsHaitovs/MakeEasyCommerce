import { ApiProperty } from '@nestjs/swagger';
import { OptionDto } from './option.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateOptionDto extends OptionDto {
    @ApiProperty({
        title: 'Related Attribute ID',
        type: Number,
        nullable: true,
    })
    @IsOptional()
    @IsNumber()
    relatedAttributeID: number;
}
