import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateRuleDto } from '@src/rule/dto/create-rule.dto';
import { IsBoolean, IsJSON, IsNumber, IsString, ValidateNested } from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';

export class CreateStringOptionDto {
    @ApiProperty({
        title: 'Attribute String Option',
        type: String,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsString({ each: true })
    data: string;
}

export class CreateNumberOptionDto {
    @ApiProperty({
        title: 'Attribute Number Option',
        type: Number,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsNumber()
    data: number;
}

export class CreateBooleanOptionDto {
    @ApiProperty({
        title: 'Attribute Boolean Option',
        type: Boolean,
        nullable: false,
        required: true,
        isArray: false
    })
    @IsNotEmpty()
    @IsBoolean()
    data: boolean;
}

export class CreateArrayOptionDto {
    @ApiProperty({
        title: 'Attribute Array Option',
        type: JSON,
        nullable: false,
        required: true,
        isArray: true
    })
    @IsNotEmpty()
    @IsJSON({ each: true })
    data: JSON[];
}
