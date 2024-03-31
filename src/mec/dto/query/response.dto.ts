import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ErrorDTO {
    @IsString()
    message: string;

    @IsString()
    in: string;
}

export class QueryResponseDto {
    @IsString()
    status: string;

    @IsString()
    message?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ErrorDTO)
    error?: ErrorDTO;
}
