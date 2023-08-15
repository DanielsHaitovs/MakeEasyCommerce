import { IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export class AttributeEAVRule {
    @Column({ default: true })
    @IsBoolean()
    useInCatalog: boolean;

    @Column({ default: true })
    @IsBoolean()
    useInListing: boolean;

    @Column({ default: true })
    @IsBoolean()
    useInLayeredNavigation: boolean;

    @Column({ default: true })
    @IsBoolean()
    useInFilter: boolean;

    @Column({ default: true })
    @IsBoolean()
    useInOptionFilter: boolean;

    @Column({ default: true })
    @IsBoolean()
    useInSort: boolean;

    @Column({ default: true })
    @IsBoolean()
    useInSearch: boolean;

    @Column({ default: true })
    @IsBoolean()
    useInPromo: boolean;

    @Column({ default: true })
    @IsBoolean()
    useInReport: boolean;

    // Other properties specific to your app's requirements (e.g., description, units, etc.)
    // Specifically Attribute options values
    // Keep in mind that Options might be different
    // Swatch option should have different types of options
    // like image, color, svg, (url?)
    // single attribute value option (only 1 color or only 1 size)
}
