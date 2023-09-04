import { Column } from 'typeorm';

export abstract class NumberAttribute {
    @Column('simple-array')
    values: number[];
}
