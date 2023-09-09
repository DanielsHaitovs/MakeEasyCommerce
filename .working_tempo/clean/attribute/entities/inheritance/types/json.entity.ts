import { ChildEntity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@ChildEntity()
export class JsonAttribute {
    @ApiProperty({ type: () => [JSON] })
    @Column('simple-array')
    values: [number] | [string] | [boolean] | [JSON] | [Date];
}
