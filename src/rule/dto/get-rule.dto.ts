import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateRuleDto, RuleBaseDto } from './create-rule.dto';

export class GetRuleDto extends CreateRuleDto {
    @ApiProperty({
        title: 'Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetRuleTypeDto extends RuleBaseDto {
    @ApiProperty({
        title: 'Rule Type end Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
