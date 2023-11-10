// import { ApiProperty } from '@nestjs/swagger';
// import { FilterRequestDto } from '../../query-filter.dto';
// import { IsNumber, IsOptional, ValidateNested } from 'class-validator';

// export class ValueQueryFilterDto extends FilterRequestDto {
//     @ApiProperty({
//         title: 'Filter Rule by this value',
//         type: [Number],
//         nullable: true,
//         required: false,
//     })
//     @IsOptional()
//     @IsNumber()
//     @ValidateNested({ each: true })
//     valueIds: number[];
// }
