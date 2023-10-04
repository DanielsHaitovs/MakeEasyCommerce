import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from './base/base.module';
import { AttributeModule } from './attribute/attribute.module';
import { Option } from './attribute/relations/option/entities/option.entity';
import { Attributes } from './attribute/entities/attributes.entity';
import { Rule } from './attribute/relations/rule/entities/rule.entity';
import { StoresModule } from './stores/stores.module';
import { Store } from './stores/entities/store.entity';
import { StoreViewModule } from './store-view/store-view.module';
import { StoreAttribute } from './store-view/store-attribute/entities/store-attribute.entity';
import { StoreAttributeDescription } from './store-view/store-attribute/entities/store-attributes/attributes-description.entity';
import { StoreRule } from './store-view/store-attribute/entities/store-attributes/attribute-rule.entity';
import { StoreView } from './store-view/entities/store-view.entity';
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
                Store,
                StoreView,
                StoreAttribute,
                StoreAttributeDescription,
                StoreRule,
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
        StoresModule,
        AttributeModule,
        BaseModule,
        StoreViewModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
