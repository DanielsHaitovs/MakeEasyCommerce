import { ApiProperty } from '@nestjs/swagger';
import { OptionDto } from './option.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class CreateOptionDto extends OptionDto {
    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;
}

export class CreateStoresOption extends CreateOptionDto {
    @ApiProperty({
        title: 'Parent Attribute Option ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedOption: number;
}

export class CreateOptionsDto {
    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedAttribute: number;

    @ApiProperty({
        title: 'Option(s) Data',
        type: [OptionDto],
    })
    @ValidateNested({ each: true })
    options: OptionDto[];
}

export class CreateStoresOptionsDto extends CreateOptionsDto {
    @ApiProperty({
        title: 'Parent Attribute Option ID',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    relatedOption: number;
}
