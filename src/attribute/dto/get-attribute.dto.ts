import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { AttributeRuleDto } from './create-attribute.dto';
import { AttributeDescriptionDto, AttributeOptionsDto } from './attribute.dto';

export class GetAttributeRuleDto extends AttributeRuleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetAttributeOptionsDto extends AttributeOptionsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetAttributeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: AttributeDescriptionDto })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;

    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: GetAttributeOptionsDto[];

    @ApiProperty({ type: GetAttributeRuleDto })
    @ValidateNested({ each: true })
    rule: GetAttributeRuleDto;
}
