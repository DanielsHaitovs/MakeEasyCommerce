import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from './base/base.module';
import { AttributeModule } from './attribute/attribute.module';
import { Option } from './attribute/relations/option/entities/option.entity';
import { Attributes } from './attribute/entities/attributes.entity';
import { Rule } from './attribute/relations/rule/entities/rule.entity';
import { StoreModule } from './store/store.module';
import { Store } from './store/entities/store.entity';
import { StoreViewRule } from './store/relations/store-attribute/entities/store-attribute/attribute-rule.entity';
import { StoreViewOption } from './store/relations/store-attribute/entities/store-attribute/attribute-option.entity';
import { StoreAttributeDescription } from './store/relations/store-attribute/entities/store-attribute/attributes-description.entity';
import { StoreAttribute } from './store/relations/store-attribute/entities/store-attribute.entity';
@Module({
    imports: [
        StoreModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.TYPEORM_HOST,
            port: 5432,
            database: process.env.TYPEORM_DATABASE,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            entities: [
                // Store ->
                Store,
                StoreAttribute,
                StoreAttributeDescription,
                StoreViewRule,
                StoreViewOption,
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
    providers: [AppService],
})
export class AppModule {}
