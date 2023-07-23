import { Column } from 'typeorm';

export class EAVAttributeRule {
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

    // Other properties specific to your app's requirements (e.g., description, units, etc.)
    // Specifically Attribute options values
    // Keep in mind that Options might be different
    // Swatch option should have different types of options
    // like image, color, svg, (url?)
    // single attribute value option (only 1 color or only 1 size)
}
