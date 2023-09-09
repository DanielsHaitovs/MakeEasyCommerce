import { ApiProperty } from '@nestjs/swagger';
import { AttributeRuleDto } from './create-eav-attribute.dto';
import { IsString } from 'class-validator';

export class UpdateAttributeDto {
    @ApiProperty({ type: String })
    @IsString()
    description: string;
}

export class UpdateAttributeRuleDto extends AttributeRuleDto {}
