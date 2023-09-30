import { MecBaseEntity } from '@src/base/entity/base.entity';
import { Column } from 'typeorm';
import { AttributeDescription } from './attribute-description.entity';

export abstract class AttributesBase extends MecBaseEntity {
    @Column(() => AttributeDescription)
    description: AttributeDescription;
}
