import { ApiProperty } from '@nestjs/swagger';
import { SingleConditionDto } from '../filters.dto';
import { AttributeRuleType } from '@src/base/enum/attributes/attribute-type.enum';
import { IsEnum } from 'class-validator';

export class AttributeRuleConditionDto extends SingleConditionDto {
    @ApiProperty({
        title: 'One of Rule types',
        enum: AttributeRuleType,
    })
    @IsEnum(AttributeRuleType)
    ruleType: AttributeRuleType;
}
