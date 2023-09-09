import { ApiProperty } from '@nestjs/swagger';
import { RuleDto } from '../../base/attribute/rule-attribute.base.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class ExtendRuleDto extends RuleDto {
    @ApiProperty({
        title: 'Attribute Rule ID',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetRulesDto {
    @ApiProperty({
        title: 'Front end attribute Rules',
        type: ExtendRuleDto,
    })
    @ValidateNested({ each: true })
    front: ExtendRuleDto;

    @ApiProperty({
        title: 'Back end (Admin) attribute Rules',
        type: ExtendRuleDto,
    })
    @ValidateNested({ each: true })
    back: ExtendRuleDto;
}

export class GetFrontRule {
    @ApiProperty({
        title: 'Front end attribute Rules',
        type: ExtendRuleDto,
    })
    @ValidateNested({ each: true })
    front: ExtendRuleDto;
}

export class GetBackRule {
    @ApiProperty({
        title: 'Back end (Admin) attribute Rules',
        type: ExtendRuleDto,
    })
    @ValidateNested({ each: true })
    back: ExtendRuleDto;
}
