import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateRuleDto } from './create-rule.dto';
import { RuleBaseDto } from '@src/base/dto/mec/attribute/attributes/rule.dto';

export class GetRuleDto extends CreateRuleDto {
    @ApiProperty({
        title: 'Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetTypeRuleDto extends RuleBaseDto {
    @ApiProperty({
        title: 'Front end Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
