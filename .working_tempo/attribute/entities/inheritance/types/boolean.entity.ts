import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class BooleanAttribute {
    @ApiProperty({ type: [Boolean] })
    @Column('simple-array')
    values: [number] | [string] | [boolean] | [JSON] | [Date];
}
