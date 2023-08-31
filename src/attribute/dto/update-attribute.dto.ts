import { ApiProperty } from '@nestjs/swagger';
import {
    GetAttributeOptionsDto,
    GetAttributeRuleDto,
} from './get-attribute.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { AttributeDescriptionDto } from './attribute.dto';

export class UpdateAttributeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: AttributeDescriptionDto })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    description: AttributeDescriptionDto;

    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    options: GetAttributeOptionsDto[];

    @ApiProperty({ type: GetAttributeRuleDto })
    @ValidateNested({ each: true })
    @IsNotEmpty()
    rule: GetAttributeRuleDto;
}
