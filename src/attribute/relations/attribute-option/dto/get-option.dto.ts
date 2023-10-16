import { ApiProperty } from '@nestjs/swagger';
import { CreateOptionDto } from './create-option.dto';

export class GetOptionDto extends CreateOptionDto {
    @ApiProperty({
        title: 'Option ID',
        description: 'Related Attribute Option ID',
        required: true,
        type: Number,
    })
    id: number;
}
