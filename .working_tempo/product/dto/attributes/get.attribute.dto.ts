import { ApiProperty } from '@nestjs/swagger';
import { AttributeDescriptionDto } from '../base/attribute/attribute.base.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { GetAttributeOptionDto } from './options/action/get-option.attribute.dto';

export class GetAttributeShortDto {
    @ApiProperty({
        title: 'Attribute Id',
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Main Attribute data and Description',
        type: AttributeDescriptionDto,
    })
    @ValidateNested({ each: true })
    description: AttributeDescriptionDto;
}

export class GetParentAttributeDto extends GetAttributeShortDto {
    @ApiProperty({
        title: 'Gets Attribute Options Dto',
        type: [GetAttributeOptionDto],
    })
    @ValidateNested({ each: true })
    options: GetAttributeOptionDto[];
}

export class GetAttributeDto extends GetAttributeShortDto {
    @ApiProperty({
        title: 'In case if this attribute has parent with bigger priority',
        type: GetParentAttributeDto,
    })
    @ValidateNested({ each: true })
    parent: GetParentAttributeDto;

    @ApiProperty({
        title: 'Gets Attribute Options Dto',
        type: [GetAttributeOptionDto],
    })
    @ValidateNested({ each: true })
    options: GetAttributeOptionDto[];
}
