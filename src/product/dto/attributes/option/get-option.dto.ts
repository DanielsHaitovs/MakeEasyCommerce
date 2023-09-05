import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributeOptionsDto } from './create-option.dto';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';

export class GetAttributeOptionsDto extends CreateAttributeOptionsDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetUpdatedOptionsDto {
    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    updatedOptions: GetAttributeOptionsDto[];

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    newOptionsIds: number[];
}
