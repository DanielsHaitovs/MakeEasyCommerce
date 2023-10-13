import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from './base/base.module';
import { AttributeModule } from './attribute/attribute.module';
import { Option } from './attribute/relations/option/entities/option.entity';
import { Rule } from './attribute/relations/rule/entities/rule.entity';
import { Attributes } from './attribute/entities/attributes.entity';
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
                Attributes,
                Rule,
                Option,
                // <- Attribute
            ],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true, // never use TRUE in production!
        }),
        AttributeModule,
        BaseModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
