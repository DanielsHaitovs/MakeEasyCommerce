import { ApiProperty } from '@nestjs/swagger';
import { RuleDto } from '../../base/attribute/rule-attribute.base.dto';
import { ValidateNested } from 'class-validator';

export class CreateRuleDto {
    @ApiProperty({
        title: 'Front end attribute Rules',
        type: RuleDto,
    })
    @ValidateNested({ each: true })
    front: RuleDto;

    @ApiProperty({
        title: 'Back end (Admin) attribute Rules',
        type: RuleDto,
    })
    @ValidateNested({ each: true })
    back: RuleDto;
}
