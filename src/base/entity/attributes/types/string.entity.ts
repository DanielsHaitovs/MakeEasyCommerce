import { Column } from 'typeorm';

export abstract class StringAttribute {
    @Column('simple-array')
    values: string[];
}
