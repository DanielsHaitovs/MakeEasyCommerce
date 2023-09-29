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
import { StoreView } from './stores/relations/store-views/entities/store-view.entity';
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
                // Attribute ->
                Attributes,
                Rule,
                Option,
                // <- Attribute
                // Store ->
                Store,
                StoreView,
                // <- Store
            ],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true, // never use TRUE in production!
        }),
        StoresModule,
        AttributeModule,
        // ProductModule,
        BaseModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
