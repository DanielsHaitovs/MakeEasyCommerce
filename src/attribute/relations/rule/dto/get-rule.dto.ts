import { ApiProperty } from '@nestjs/swagger';
import { RuleBaseDto, RuleDto } from './rule-base.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetRulesDto extends RuleDto {
    @ApiProperty({
        title: 'Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetFrontRuleDto extends RuleBaseDto {
    @ApiProperty({
        title: 'Front end Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetBackRuleDto extends RuleBaseDto {
    @ApiProperty({
        title: 'Back end Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
