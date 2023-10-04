import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { OptionDto } from './option.dto';

export class UpdateOptionDto extends OptionDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Parent Attribute ID',
        type: Number,
        nullable: true,
        default: null,
    })
    @IsOptional()
    @IsNumber()
    relatedAttribute: number;
}

export class UpdateManyOptionsDto {
    @ApiProperty({
        title: 'Option(s) Data',
        type: [UpdateOptionDto],
    })
    @ValidateNested({ each: true })
    options: UpdateOptionDto[];

    @ApiProperty({
        title: 'Options Ids',
        type: [Number],
        nullable: true,
        default: null,
    })
    @IsOptional()
    optionsIds: number[];
}
