import { ApiProperty } from '@nestjs/swagger';
import {
    RuleDto,
    AttributeDescriptionDto,
    AttributeOptionsDto,
} from './create-attribute.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class GetRuleDto extends RuleDto {
    // @ApiProperty()
    // @IsNotEmpty()
    // @IsNumber()
    // id: number;
}

export class GetAttributeOptionDto extends AttributeOptionsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetAttributeRuleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
    @ApiProperty({ type: () => GetRuleDto })
    @ValidateNested({ each: true })
    front: GetRuleDto;
    @ApiProperty({ type: () => GetRuleDto })
    @ValidateNested({ each: true })
    back: GetRuleDto;
}

export class GetAttributeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: () => AttributeDescriptionDto })
    description: AttributeDescriptionDto;

    @ApiProperty({ type: () => GetAttributeRuleDto })
    @ValidateNested({ each: true })
    rule: GetAttributeRuleDto;

    @ApiProperty({ type: () => GetAttributeOptionDto })
    @ValidateNested({ each: true })
    options: GetAttributeOptionDto;
}
