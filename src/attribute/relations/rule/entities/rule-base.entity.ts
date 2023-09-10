import { IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export abstract class RuleBaseEntity {
    @Column()
    @IsBoolean()
    useInCatalog: boolean;

    @Column()
    @IsBoolean()
    useInListing: boolean;

    @Column()
    @IsBoolean()
    useInLayeredNavigation: boolean;

    @Column()
    @IsBoolean()
    useInFilter: boolean;

    @Column()
    @IsBoolean()
    useInOptionFilter: boolean;

    @Column()
    @IsBoolean()
    useInSort: boolean;

    @Column()
    @IsBoolean()
    useInSearch: boolean;

    @Column()
    @IsBoolean()
    useInPromo: boolean;

    @Column()
    @IsBoolean()
    useInReport: boolean;

    // Other properties specific to your app's requirements (e.g., description, units, etc.)
    // Specifically Attribute options values
    // Keep in mind that Options might be different
    // Swatch option should have different types of options
    // like image, color, svg, (url?)
    // single attribute value option (only 1 color or only 1 size)
}
