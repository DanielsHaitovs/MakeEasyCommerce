import { IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export abstract class BooleanAttribute {
    @Column()
    @IsBoolean()
    values: boolean;
}
