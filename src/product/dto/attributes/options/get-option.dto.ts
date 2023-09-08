import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributeOptionsDto } from './create-option.dto';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { AttributeShortDescriptionDto } from '../../base/attributes/attribute-base.dto';

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

export class GetProductAttributeOptionsList {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: AttributeShortDescriptionDto })
    @ValidateNested({ each: true })
    description: AttributeShortDescriptionDto;

    @ApiProperty({ type: [GetAttributeOptionsDto] })
    @ValidateNested({ each: true })
    options: GetAttributeOptionsDto[];
}
