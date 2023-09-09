import { IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export class Rule {
    @Column()
    @IsBoolean()
    // @ToBoolean()
    useInCatalog: boolean;

    @Column()
    @IsBoolean()
    // @ToBoolean()
    useInListing: boolean;

    @Column()
    @IsBoolean()
    // @ToBoolean()
    useInLayeredNavigation: boolean;

    @Column()
    @IsBoolean()
    // @ToBoolean()
    useInFilter: boolean;

    @Column()
    @IsBoolean()
    // @ToBoolean()
    useInOptionFilter: boolean;

    @Column()
    @IsBoolean()
    // @ToBoolean()
    useInSort: boolean;

    @Column()
    @IsBoolean()
    // @ToBoolean()
    useInSearch: boolean;

    @Column()
    @IsBoolean()
    // @ToBoolean()
    useInPromo: boolean;

    @Column()
    @IsBoolean()
    // @ToBoolean()
    useInReport: boolean;

    // Other properties specific to your app's requirements (e.g., description, units, etc.)
    // Specifically Attribute options values
    // Keep in mind that Options might be different
    // Swatch option should have different types of options
    // like image, color, svg, (url?)
    // single attribute value option (only 1 color or only 1 size)
}
