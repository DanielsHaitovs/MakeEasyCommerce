import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributeDto } from './create-attribute.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { QueryResponseDto } from '@src/mec/dto/query/response.dto';
import { IsOptional, ValidateNested } from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { GetRuleDto } from '@src/rule/dto/get-rule.dto';

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

    @ApiProperty({
        title: 'Rule',
        nullable: true,
        required: false,
        type: GetRuleDto
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => GetRuleDto)
    rule: GetRuleDto;
}

export class AttributeResponseDto extends QueryResponseDto {
    @ApiProperty()
    @IsOptional()
    @ValidateNested()
    @Type(() => GetAttributeDto)
    result?: GetAttributeDto | GetAttributeDto[];
}
