import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MecModule } from './mec/mec.module';
import { AttributeModule } from './attribute/attribute.module';
import { Attribute } from './attribute/entities/attribute.entity';
import { AttributeRuleModule } from './rule/rule.module';
import { AttributeRule } from './rule/entities/rule.entity';
import { AttributeOptionModule } from './option/option.module';
import { AttributeOption } from './option/entities/option.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.TYPEORM_HOST,
            port: 5432,
            database: process.env.TYPEORM_DATABASE,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            entities: [
                // Store ->
                // <- Store
                // Attribute ->
                Attribute,
                AttributeRule,
                AttributeOption
                // <- Attribute
            ],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
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
