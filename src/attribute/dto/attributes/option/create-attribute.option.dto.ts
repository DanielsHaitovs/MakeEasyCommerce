import { ApiProperty } from "@nestjs/swagger";
import { OptionDto } from "@src/base/dto/mec/attribute/attributes/option.dto";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

export class CreateOptionAttributeDto extends OptionDto {}

export class CreateOneAttributeOptionDto extends CreateOptionAttributeDto {
    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;
}

export class CreateAttributeOptionsDto {
    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;

    @ApiProperty({
        title: 'Attribute Options',
        type: [CreateOptionAttributeDto],
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    options: CreateOptionAttributeDto[];
}
