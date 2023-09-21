import { ApiProperty } from '@nestjs/swagger';
import { QueryResponse } from '@src/base/dto/responses/response.create-query.dto';
import { IsNotEmpty } from 'class-validator';
import { GetOptionDto } from './get-option.dto';

export class OptionDto {
    @ApiProperty({
        title: 'Attribute Option Value',
        type: JSON,
        nullable: false,
    })
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;
}

export class OptionResponseDto extends QueryResponse {
    result?: GetOptionDto | GetOptionDto[];
}
