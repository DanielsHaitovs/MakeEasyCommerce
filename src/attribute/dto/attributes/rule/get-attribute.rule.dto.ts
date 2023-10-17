import { ApiProperty } from "@nestjs/swagger";
import { GetRuleDto, GetTypeRuleDto } from "@src/attribute/relations/attribute-rule/dto/get-rule.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetAttributeRuleDto extends GetRuleDto {
    @ApiProperty({
        title: 'Parent Attribute Rule ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetAttributeTypeRuleDto extends GetTypeRuleDto {
    @ApiProperty({
        title: 'Parent Attribute Rule ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
