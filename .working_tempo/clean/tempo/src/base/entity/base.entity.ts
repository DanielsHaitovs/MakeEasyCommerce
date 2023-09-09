import {
    BaseEntity as TypeOrmBaseEntity,
    PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class MecBaseEntity extends TypeOrmBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;
}
