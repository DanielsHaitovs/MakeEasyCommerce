import { ApiProperty } from "@nestjs/swagger";
import { RuleDto } from "@src/base/dto/mec/attribute/attributes/rule.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRuleAttributeDto extends RuleDto {}


export class CreateAttributeRuleDto extends CreateRuleAttributeDto {
    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;
}
