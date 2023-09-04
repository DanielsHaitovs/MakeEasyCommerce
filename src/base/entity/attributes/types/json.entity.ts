import { Column } from 'typeorm';

export abstract class JsonAttribute {
    @Column('simple-array')
    values: JSON[];
}
