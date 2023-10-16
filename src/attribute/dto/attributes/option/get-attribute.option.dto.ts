import { ApiProperty } from "@nestjs/swagger";
import { OptionDto } from "@src/base/dto/mec/attribute/attributes/option.dto";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CreateAttributeOptionsDto, CreateOneAttributeOptionDto } from "./create-attribute.option.dto";

export class GetOneAttributeOptionDto extends CreateOneAttributeOptionDto {
    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetAttributeOptionsDto extends CreateAttributeOptionsDto {
    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Attribute Options',
        type: [GetOneAttributeOptionDto],
        nullable: false,
    })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    options: GetOneAttributeOptionDto[];
}
