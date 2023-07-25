import {
    Entity,
    Tree,
    Column,
    PrimaryGeneratedColumn,
    TreeChildren,
    TreeParent,
} from 'typeorm';

@Entity('catalog_index')
@Tree('nested-set')
export class Catalog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeChildren()
    children: Catalog[];

    @TreeParent()
    parent: Catalog;
}
