import { ApiProperty } from '@nestjs/swagger';
import { FilterRequestDto } from '@src/mec/dto/filter/query-filter.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class OptionQueryFilterDto extends FilterRequestDto {
    @ApiProperty({
        title: 'Attribute Option ID(s)',
        type: [Number],
        nullable: true,
        default: null,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    optionIds: number[];
}
