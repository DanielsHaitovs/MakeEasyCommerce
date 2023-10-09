import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
    TableIndex,
} from 'typeorm';

export class createStoreOptionTable implements MigrationInterface {
    constructor(private readonly queryRunner: QueryRunner) {}
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'test_store_option',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'value',
                        type: 'jsonb',
                        isNullable: false,
                    },
                    {
                        name: 'relatedAttribute',
                        type: 'int',
                        isNullable: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(
            'ik_test_option',
            new TableIndex({
                name: 'ik_store_option_index',
                columnNames: ['id', 'value'],
            }),
        );

        await queryRunner.createForeignKey(
            'fk_store_option',
            new TableForeignKey({
                columnNames: ['relatedAttribute'],
                referencedColumnNames: ['id'],
                referencedTableName: 'attributes',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('test_store_option');
    }
}
