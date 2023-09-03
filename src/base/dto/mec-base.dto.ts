import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class MecBaseShortDto {
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

export class MecBaseDto extends TimeStampDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}
