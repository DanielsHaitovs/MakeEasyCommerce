import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { GetAttributeShortDto } from '../get.attribute.dto';

export class AttributeOptionDto {
    @ApiProperty({
        title: 'Attribute Option Value',
        type: JSON,
    })
    @IsNotEmpty()
    value: string | number | boolean | Date | JSON;

    @ApiProperty({
        title: 'Parent Attribute Short Dto',
        type: GetAttributeShortDto,
    })
    @ValidateNested({ each: true })
    parentAttribute: GetAttributeShortDto;
    // simpleProductOptions: GetSingleAttributeOptions[]

    @ApiProperty({
        title: 'simpleProductOptionsIds are related to original options',
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    simpleProductOptionsIds: number[];
}
