import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { AttributeType } from '@src/attribute/enum/attribute.enum';
import { MecBaseEntity } from '@src/mec/entities/mec.entity';

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
