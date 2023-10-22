import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import {
    CreateAttributeDto,
    CreateAttributeShortDto,
} from './create-attribute.dto';
import { GetRuleDto } from '@src/rule/dto/get-rule.dto';

export class GetAttributeShortDto extends CreateAttributeShortDto {
    @ApiProperty({
        title: 'Attribute Id',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetAttributeDto extends CreateAttributeDto {
    @ApiProperty({
        title: 'Attribute Id',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Attribute Rule',
        type: GetRuleDto,
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    rule: GetRuleDto;
}
