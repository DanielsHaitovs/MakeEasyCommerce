import { ApiProperty } from '@nestjs/swagger';
import { EavDescriptionDto } from '../create-eav.dto';
import { ValidateNested } from 'class-validator';
import { EavAttributeRuleDto } from './create-eav-attribute.dto';
import { GetEavParentDto } from '../get-eav.dto';

export class GetEavAttributeDto {
    @ApiProperty({ type: EavDescriptionDto })
    @ValidateNested()
    attribute: EavDescriptionDto;
    @ApiProperty({ type: EavAttributeRuleDto })
    @ValidateNested()
    rule: EavAttributeRuleDto;
    @ApiProperty({ type: GetEavParentDto })
    @ValidateNested()
    parent_eav: GetEavParentDto;
}
