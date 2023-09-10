import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from './base/base.module';
import { AttributeModule } from './attribute/attribute.module';
import { RuleModule } from './attribute/relations/rule/rule.module';
import { Rule } from './attribute/relations/rule/entities/rule.entity';
// Product ->
// <- Product
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
                Rule,
                // Product ->
                // <- Product
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
    providers: [AppService],
})
export class AppModule {}
