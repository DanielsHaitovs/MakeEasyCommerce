import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MecModule } from './mec/mec.module';
import { AttributeModule } from './attribute/attribute.module';
import { AttributeRuleModule } from './rule/rule.module';
import { AttributeOptionModule } from './option/option.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.TYPEORM_HOST,
            port: 5432,
            database: process.env.TYPEORM_DATABASE,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            //entities: ['dist/**/*.entity{.ts,.js}'],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            autoLoadEntities: true,
            synchronize: true // never use TRUE in production!
        }),
        MecModule,
        AttributeModule,
        AttributeRuleModule,
        AttributeOptionModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
