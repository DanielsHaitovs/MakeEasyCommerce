import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from './base/base.module';
import { AttributeOption } from './attribute/relations/attribute-option/entities/option.entity';
import { AttributeModule } from './attribute/attribute.module';
import { Attribute } from './attribute/entities/attribute.entity';
import { AttributeRule } from './attribute/relations/attribute-rule/entities/rule.entity';
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
                AttributeOption,
                AttributeRule,
                // <- Attribute
            ],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true, // never use TRUE in production!
        }),
        BaseModule,
        AttributeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
