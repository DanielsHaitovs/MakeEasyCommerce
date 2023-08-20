import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Unique } from 'typeorm';

// Duplicated params related to
// each level of EAV entity
@Unique(['name', 'code'])
export class Description {
    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    code: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    description: string;
}
