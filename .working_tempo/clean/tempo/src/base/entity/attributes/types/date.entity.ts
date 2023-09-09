import { IsDate } from 'class-validator';
import { Column } from 'typeorm';

export abstract class DateAttribute {
    @Column()
    @IsDate()
    values: Date;
}
