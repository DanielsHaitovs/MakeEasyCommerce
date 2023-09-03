import { ChildEntity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@ChildEntity()
export class DateAttribute {
    @ApiProperty({ type: () => [Date] })
    @Column('simple-array')
    values: [number] | [string] | [boolean] | [JSON] | [Date];
}
