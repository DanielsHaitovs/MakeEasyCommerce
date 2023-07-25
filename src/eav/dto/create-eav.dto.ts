import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';

export class DescriptionDto {
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
    @ApiProperty({ type: DescriptionDto })
    @ValidateNested({ each: true })
    description: DescriptionDto;
    @ApiProperty({ type: [EavDto] })
    @ValidateNested({ each: true })
    children: EavDto[];
}

export class CreateEavDto extends EavDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    parent: number;
}

export class CreateParentEavDto extends EavDto {
    @ApiProperty()
    @IsNumber()
    id: number;
}

export class CreateChildEavDto extends EavDto {
    @ApiProperty({ type: CreateParentEavDto })
    @ValidateNested({ each: true })
    parent: CreateParentEavDto;
}
