import { ApiProperty } from '@nestjs/swagger';
import { AttributeDto } from '@src/mec/dto/attribute/attribute.dto';
import { CreateRuleDto } from '@src/rule/dto/create-rule.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateAttributeShortDto extends AttributeDto {}
export class CreateAttributeDto extends AttributeDto {
    @ApiProperty({
        title: 'Attribute Rule',
        type: CreateRuleDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    rule: CreateRuleDto;
}
