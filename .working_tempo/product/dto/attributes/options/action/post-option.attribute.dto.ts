import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { GetAttributeShortDto } from '../../get.attribute.dto';

export class CreateOptionDto {
    @ApiProperty({
        title: 'Attribute Option Value',
        type: JSON,
    })
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;

    @ApiProperty({
        title: 'Parent Attribute Short Dto',
        type: GetAttributeShortDto,
    })
    @ValidateNested({ each: true })
    parentAttribute: GetAttributeShortDto;
}
