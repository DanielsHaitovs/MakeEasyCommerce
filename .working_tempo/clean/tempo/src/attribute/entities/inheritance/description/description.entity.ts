import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Column, Index, Unique } from 'typeorm';
import { AttributeType } from '../../../../base/enum/attributes/type.enum';

const uniqueCode = 'attribute_description_unique';
const indexCode = 'attribute_description_index';
@Unique(uniqueCode, ['name', 'code'])
@Index(indexCode, ['name', 'code'])
export abstract class AttributeDescription {
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
    dataType: string;

    @Column({ default: false })
    @IsNotEmpty()
    @IsBoolean()
    isArray: boolean;
}
