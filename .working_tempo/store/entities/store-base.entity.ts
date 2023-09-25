import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export abstract class StoreDescription {
    @Column({
        default: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

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
}

export abstract class StoreViewDescription extends StoreDescription {}
