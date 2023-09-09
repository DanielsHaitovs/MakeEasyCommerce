import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Index, Unique } from 'typeorm';
import { AttributeType } from '../../enum/type.enum';

@Unique(['name', 'code'])
@Index('attribute_description_index', ['name', 'code'])
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

    @Column({ type: 'enum', enum: AttributeType })
    @IsNotEmpty()
    type: AttributeType;
}
