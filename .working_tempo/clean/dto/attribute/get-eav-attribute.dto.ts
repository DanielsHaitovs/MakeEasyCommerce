import { ApiProperty } from '@nestjs/swagger';
import { EavDescriptionDto } from '../create-eav.dto';
import { ValidateNested } from 'class-validator';
import { AttributeRuleDto } from './create-eav-attribute.dto';
import { GetEavParentDto } from '../get-eav.dto';

export class GetAttributeDto {
    @ApiProperty({ type: EavDescriptionDto })
    @ValidateNested()
    attribute: EavDescriptionDto;
    @ApiProperty({ type: AttributeRuleDto })
    @ValidateNested()
    rule: AttributeRuleDto;
    @ApiProperty({ type: GetEavParentDto })
    @ValidateNested()
    parent_eav: GetEavParentDto;
}
