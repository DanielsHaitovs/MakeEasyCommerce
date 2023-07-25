import { ApiProperty } from '@nestjs/swagger';
import { EavDto } from './create-eav.dto';
import { IsNumber, ValidateNested } from 'class-validator';

export class GetParentEavDto extends EavDto {
    @ApiProperty()
    @IsNumber()
    id: number;
}

export class GetEavDto extends EavDto {
    @ApiProperty()
    @IsNumber()
    id: number;
    @ApiProperty({ type: GetEavDto })
    @ValidateNested({ each: true })
    parent: GetEavDto;
}
