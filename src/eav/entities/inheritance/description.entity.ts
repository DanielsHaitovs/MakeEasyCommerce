import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

// Duplicated params related to
// each level of EAV entity
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
