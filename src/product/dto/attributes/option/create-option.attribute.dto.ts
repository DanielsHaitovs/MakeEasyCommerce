import { ApiProperty } from '@nestjs/swagger';
import { AttributeOptionDto } from '../../base/attribute/option-attribute.base.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class CreateOptionsDto {
    @ApiProperty({
        title: 'Create options for parent attribute',
        type: [AttributeOptionDto],
    })
    @ValidateNested({ each: true })
    values: AttributeOptionDto[];

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    parentAttributeId: number;
}

export class CreateSingleOptionDto {
    @ApiProperty({
        title: 'Create single option for parent attribute',
        type: AttributeOptionDto,
    })
    @ValidateNested({ each: true })
    value: AttributeOptionDto;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    parentAttributeId: number;
}

export class CreateSimpleProductOption extends CreateSingleOptionDto {
    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    parentOptionId: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    parentProductId: number;
}
