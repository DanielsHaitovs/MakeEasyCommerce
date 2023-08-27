import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import {
    AttributeOptionsDto,
    CreateAttributeDto,
} from './create-attribute.dto';

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
}
