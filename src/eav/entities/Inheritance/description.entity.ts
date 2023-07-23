import { IsString } from 'class-validator';
import { Column } from 'typeorm';

// Duplicated params related to
// each level of EAV entity
export class Description {
    @Column({ default: true })
    @IsString()
    name: string;

    @Column()
    @IsString()
    code: string;

    @Column({ default: true })
    @IsString()
    description: string;
}
