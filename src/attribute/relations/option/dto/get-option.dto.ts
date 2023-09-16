import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { OptionDto } from './option.dto';

export class GetOptionDto extends OptionDto {
    @ApiProperty({
        title: 'Attribute Option Id',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Related Attribute ID',
        type: Number,
        nullable: true,
    })
    @IsOptional()
    @IsNumber()
    relatedAttributeID: number;
}
