import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateRuleAttributeDto } from './attributes/rule/create-attribute.rule.dto';
import { CreateOptionAttributeDto } from './attributes/option/create-attribute.option.dto';
import { CreateAttributeDto, CreateAttributeShortDto } from './create-attribute.dto';
import { GetAttributeRuleDto } from './attributes/rule/get-attribute.rule.dto';
import { GetOneAttributeOptionDto } from './attributes/option/get-attribute.option.dto';

export class GetAttributeShortDto extends CreateAttributeShortDto {
    @ApiProperty({
        title: 'Attribute Rule',
        type: CreateRuleAttributeDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    rule: GetAttributeRuleDto;
}

export class GetAttributeDto extends CreateAttributeDto {
    @ApiProperty({
        title: 'Attribute Rule',
        type: CreateRuleAttributeDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    rule: GetAttributeRuleDto;

    @ApiProperty({
        title: 'Attribute Options',
        type: [GetOneAttributeOptionDto],
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    options: GetOneAttributeOptionDto[];
}
