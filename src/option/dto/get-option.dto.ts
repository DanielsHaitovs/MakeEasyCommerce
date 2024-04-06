import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateArrayOptionDto } from './create-option.dto';

export class GetStringOptionDto extends CreateArrayOptionDto {
    @ApiProperty({
        title: 'Attribute String Option ID',
        type: Number,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetNumberOptionDto extends CreateArrayOptionDto {
    @ApiProperty({
        title: 'Attribute Number Option ID',
        type: Number,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetBooleanOptionDto extends CreateArrayOptionDto {
    @ApiProperty({
        title: 'Attribute Boolean Option ID',
        type: Number,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetArrayOptionDto extends CreateArrayOptionDto {
    @ApiProperty({
        title: 'Attribute Array Option ID',
        type: Number,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
