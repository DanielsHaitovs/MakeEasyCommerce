import { ApiProperty } from '@nestjs/swagger';
import { GetAttributeOptionDto } from '../../base/attribute/option-attribute.base.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class GetOptionsDto {
    @ApiProperty({
        title: 'Gets options for related attribute',
        type: [GetAttributeOptionDto],
    })
    @ValidateNested({ each: true })
    values: GetAttributeOptionDto[];

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    parentAttributeId: number;
}

export class GetSingleOptionDto {
    @ApiProperty({
        title: 'Create single option for parent attribute',
        type: GetAttributeOptionDto,
    })
    @ValidateNested({ each: true })
    value: GetAttributeOptionDto;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    parentAttributeId: number;
}

export class GetSimpleProductOption extends GetSingleOptionDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    parentOptionId: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    parentProductId: number;
}
