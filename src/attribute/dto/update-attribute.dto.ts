import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AttributeBaseDto } from './create-attribute.dto';
import { UpdateRuleDto } from '@src/rule/dto/update-rule.dto';
import { IsNumber, IsOptional } from '@nestjs/class-validator';

export class UpdateAttributeDto extends PartialType(AttributeBaseDto) {}

export class UpdateAttributeRuleDto extends UpdateRuleDto {
    @ApiProperty({
        type: Number,
        description: 'Attribute ID',
        name: 'id',
        required: false,
        nullable: true
    })
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty({
        type: Number,
        description: 'Attribute Rule ID',
        name: 'ruleId',
        required: false,
        nullable: true
    })
    @IsOptional()
    @IsNumber()
    ruleId: number;
}
