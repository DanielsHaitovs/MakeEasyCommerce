import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class MECBaseDto {
    @ApiProperty({
        title: 'Entity Primary Key (ID)',
        type: Number,
        nullable: false,
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({
        title: 'Entity Created Time',
        type: Date,
    })
    @IsOptional()
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        title: 'Entity Updated Time',
        type: Date,
    })
    @IsOptional()
    @IsDate()
    updatedAt: Date;
}
