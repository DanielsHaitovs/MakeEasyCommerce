import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { QueryFilterDto } from '@src/mec/dto/query/filter.dto';
import { IsNumber, IsString } from '@nestjs/class-validator';

export class StringOptionWhereDto {
    @ApiProperty({
        title: 'String Option Data',
        description: 'Option to include more then 1 of existing option values into filtering using',
        nullable: true,
        isArray: true,
        required: false
    })
    @IsOptional()
    @IsString({ each: true })
    selectWhere: string[];
}

export class NumberOptionWhereDto {
    @ApiProperty({
        title: 'Number Option Data',
        description: 'Option to include more then 1 of existing option values into filtering using',
        type: Number,
        nullable: true,
        isArray: true,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    selectWhere: number[];
}

export class OptionQueryDto extends QueryFilterDto {
    @ApiProperty({
        title: 'Number Option Data',
        description: 'Option to include more then 1 of existing option values into filtering using',
        type: Number,
        nullable: true,
        isArray: true,
        required: false
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    whereNumber: number[];

    @ApiProperty({
        title: 'String Option Data',
        description: 'Option to include more then 1 of existing option values into filtering using',
        nullable: true,
        isArray: true,
        required: false
    })
    @IsOptional()
    @IsString({ each: true })
    whereString: string[];
}
