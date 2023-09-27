import { Entity, Index, Unique } from 'typeorm';
import { AttributesBase } from './attribute.base.entity';

@Entity('eav_attribute_index')
@Index('ik_attribute_index', [
    'id',
    'description.code',
    'description.isActive',
    'description.isRequired',
])
@Unique('uk_attribute_index', ['description.name', 'description.code'])
export class Attributes extends AttributesBase {}
