import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Column, Unique, Index } from 'typeorm';
import { AttributeType } from '@src/attribute/enum/attribute.enum';
import { MecBaseEntity } from '@src/mec/entities/mec.entity';

export abstract class AttributesBase extends MecBaseEntity {
    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    @Index('ik_attribute_active')
    isActive: boolean;

    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isRequired: boolean;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Unique('uk_attribute_name', ['name'])
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Unique('uk_attribute_code', ['code'])
    @Index('ik_attribute_code')
    code: string;

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
}
