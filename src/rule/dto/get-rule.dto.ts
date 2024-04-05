import { ApiProperty } from '@nestjs/swagger';
import { CreateRuleDto, RuleBaseDto } from './create-rule.dto';
import { IsOptional, ValidateNested, IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

import { QueryResponseDto } from '@src/mec/dto/query/response.dto';

export class GetRuleDto extends CreateRuleDto {
    @ApiProperty({
        title: 'Attribute Rule ID',
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetRuleTypeDto extends RuleBaseDto {
    @ApiProperty({
        title: 'Rule Type end Attribute Rule ID',
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class RuleResponseDto extends QueryResponseDto {
    @ApiProperty()
    @IsOptional()
    @ValidateNested()
    @Type(() => GetRuleDto)
    result?: GetRuleDto | GetRuleDto[];
}
