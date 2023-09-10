import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributeRulesDto } from './create-rule.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAttributeRulesDto extends CreateAttributeRulesDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
