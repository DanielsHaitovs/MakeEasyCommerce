import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

export class EavDescriptionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
}

export class EavDto {
    @ApiProperty({ default: null })
    @IsOptional()
    rules: any;
    @ApiProperty({ type: EavDescriptionDto })
    @IsNotEmpty()
    description: EavDescriptionDto;
}

export class CreateEavDto extends EavDto {
    @ApiProperty({ default: 1 })
    @IsNotEmpty()
    @IsNumber()
    parent_id: number;
}

export class CreateChildEavDto {
    @ApiProperty({
        default: null,
        type: EavDto,
    })
    @ValidateNested()
    parent: EavDto;
}
