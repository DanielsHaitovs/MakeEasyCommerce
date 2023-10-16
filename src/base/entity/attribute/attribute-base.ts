import { MecBaseEntity } from '@src/base/entity/base.entity';
import { AttributeType } from '@src/base/enum/attributes/attribute-type.enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export abstract class AttributeDescriptionShort {
    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    code: string;
}

export abstract class AttributeDetails {
    @Column()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Column()
    @IsNotEmpty()
    @IsEnum(AttributeType)
    dataType: AttributeType;

    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isArray: boolean;
    
    // @Column('simple-array')
    // @IsEnum(ProductTypes)
    // appliesTo: ProductTypes[];
}

export abstract class AttributesBase extends MecBaseEntity {
    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    code: string;

    @Column(() => AttributeDetails)
    details: AttributeDetails;
}
