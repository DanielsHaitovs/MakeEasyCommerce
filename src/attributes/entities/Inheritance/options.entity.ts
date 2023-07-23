import { IsBoolean, IsString } from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm';

@Entity('attributes_index')
@Tree('nested-set')
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsString()
    code: string;

    @Column()
    @IsBoolean()
    is_active: boolean;

    @Column({ type: 'enum', enum: ['string', 'number', 'boolean', 'date'] })
    dataType: 'string' | 'number' | 'boolean' | 'date';

    // Other properties specific to your app's requirements (e.g., description, units, etc.)
    // Specifically Attribute options values
    // Keep in mind that Options might be different
    // Swatch option should have different types of options
    // like image, color, svg, (url?)
    // single attribute value option (only 1 color or only 1 size)

    // Additional fields for admin settings (e.g., useInFilter, useInSort, useInReport, etc.)
    @Column({ default: true })
    useInCatalog: boolean;

    @Column({ default: true })
    useInListing: boolean;

    @Column({ default: true })
    useInLayeredNavigation: boolean;

    @Column({ default: true })
    useInFilter: boolean;

    @Column({ default: true })
    useInOptionFilter: boolean;

    @Column({ default: true })
    useInSort: boolean;

    @Column({ default: true })
    useInSearch: boolean;

    @Column({ default: true })
    useInPromo: boolean;

    @Column({ default: true })
    useInReport: boolean;

    // Tree relationships
    @TreeChildren()
    children: Attribute[];

    @TreeParent()
    parent: Attribute;
}

// @ManyToMany(() => Product, (product) => product.attributes)
// @JoinTable()
// products: Product[];
