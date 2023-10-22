import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateRuleDto } from './create-rule.dto';
import { RuleBaseDto } from '@src/mec/dto/attribute/attributes/rule.dto';

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
        title: 'Front end Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
