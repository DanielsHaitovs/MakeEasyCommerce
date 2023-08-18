import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { EavDto } from './create-eav.dto';
import { GetEavAttributeDto } from './attribute/get-eav-attribute.dto';

export class GetEavParentDto extends EavDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class GetEavParentAttributesDto extends EavDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
    @ApiProperty({ type: [GetEavAttributeDto] })
    @ValidateNested()
    attributes: GetEavAttributeDto[];
}

export class GetEavChildDto extends EavDto {
    @ApiProperty({ type: EavDto })
    @ValidateNested()
    parent: EavDto;
    @ApiProperty({ type: EavDto })
    @ValidateNested()
    child: EavDto;
}

export class GetEavAllChildDto extends EavDto {
    @ApiProperty({ type: EavDto })
    @ValidateNested()
    parent: EavDto;
    @ApiProperty({ type: [EavDto] })
    @ValidateNested()
    children: EavDto[];
}
