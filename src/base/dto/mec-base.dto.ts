import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class MecBaseDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class TimeStampDto {
    @ApiProperty()
    @IsOptional()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    updatedAt: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    deletedAt: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    restoredAt: Date;
}
