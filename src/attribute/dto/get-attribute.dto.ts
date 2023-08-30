import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { AttributeRuleDto, CreateAttributeDto } from './create-attribute.dto';
import { AttributeOptionsDto } from './attribute.dto';

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

export class GetAttributeDto extends PartialType(CreateAttributeDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: GetAttributeOptionsDto[];

    @ApiProperty({ type: GetAttributeRuleDto })
    @IsNotEmpty()
    rule: GetAttributeRuleDto;
}
