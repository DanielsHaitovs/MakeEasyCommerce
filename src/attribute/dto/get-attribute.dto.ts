import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributeDto } from './create-attribute.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { QueryResponseDto } from '@src/mec/dto/query/response.dto';
import { IsOptional, ValidateNested } from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';

export class GetAttributeDto extends CreateAttributeDto {
    @ApiProperty({
        title: 'Attribute Id',
        type: Number,
        nullable: false,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class AttributeResponseDto extends QueryResponseDto {
    @ApiProperty()
    @IsOptional()
    @ValidateNested()
    @Type(() => GetAttributeDto)
    result?: GetAttributeDto | GetAttributeDto[];
}
