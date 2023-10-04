import { ApiProperty } from '@nestjs/swagger';
import {
    RuleBaseDto,
    RuleDto,
} from '@src/attribute/relations/rule/dto/rule-base.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetStoreRuleDto extends RuleDto {
    @ApiProperty({
        title: 'Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetStoreFrontRuleDto extends RuleBaseDto {
    @ApiProperty({
        title: 'Front end Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetStoreBackRuleDto extends RuleBaseDto {
    @ApiProperty({
        title: 'Back end Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
