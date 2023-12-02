import { ApiProperty } from '@nestjs/swagger';
import { CreateOptionDto } from './create-option.dto';

export class GetOptionDto extends CreateOptionDto {
    @ApiProperty({
        title: 'Attribute Option ID',
        description: 'Option that is assigned to specific attribute',
        required: true,
        type: Number,
    })
    id: number;
}
