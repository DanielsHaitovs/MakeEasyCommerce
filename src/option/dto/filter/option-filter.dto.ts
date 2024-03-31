import { ApiProperty } from '@nestjs/swagger';
import { QueryFilterDto } from '@src/mec/dto/query/filter.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class OptionQueryFilterDto extends QueryFilterDto {
    @ApiProperty({
        title: 'Attribute Option ID(s)',
        type: [Number],
        nullable: true,
        default: null,
        required: false
    })
    @IsOptional()
    @IsNumber()
    optionIds: number[];
}
