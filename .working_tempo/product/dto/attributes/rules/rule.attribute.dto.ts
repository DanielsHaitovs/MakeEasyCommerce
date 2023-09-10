import { ApiProperty } from '@nestjs/swagger';
import { RuleBaseDto } from '../../base/attribute/rule-attribute.base.dto';
import { ValidateNested } from 'class-validator';

export class RuleDto {
    @ApiProperty({
        title: 'Attribute Rule designed for Front End',
        type: RuleBaseDto,
    })
    @ValidateNested({ each: true })
    front: RuleBaseDto;

    @ApiProperty({
        title: 'Attribute Rule designed for Back End',
        type: RuleBaseDto,
    })
    @ValidateNested({ each: true })
    back: RuleBaseDto;
}
