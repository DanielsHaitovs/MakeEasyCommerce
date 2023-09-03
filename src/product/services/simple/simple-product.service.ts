import { Injectable } from '@nestjs/common';
import { CreateSimpleProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import {
    ProductError,
    ProductSuccess,
} from '../../dto/requests/product-response.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { GetSimpleProductDto } from '@src/product/dto/get-product.dto';
import { SimpleProduct } from '@src/product/entities/product-types/simple-product.entity';
import { AttributeConditionsDto } from '@src/base/dto/attributes/requests/attribute-requests.dto';

@Injectable()
export class SimpleProductService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        createProductDto,
    }: {
        createProductDto: CreateSimpleProductDto;
    }): Promise<ProductError | ProductSuccess> {
        try {
            const validate = await this.productExists({
                name: createProductDto.name,
                sku: createProductDto.sku,
            });

            if (validate) {
                return {
                    message: 'Product Already exists',
                    errors: [
                        {
                            message: 'mentioned name or sku already exists',
                        },
                        {
                            status: 999,
                        },
                    ],
                };
            }
            const newProduct = await this.entityManager.save(
                SimpleProduct,
                this.entityManager.create(SimpleProduct, createProductDto),
            );

            return {
                status: 200,
                result: [newProduct],
            };
        } catch (e) {
            return {
                message: 'Error saving this product',
                errors: [
                    {
                        message: e.message,
                    },
                    {
                        status: e.status,
                    },
                ],
            };
        }
    }

    async findAll({
        condition,
    }: {
        condition: AttributeConditionsDto;
    }): Promise<ProductError | GetSimpleProductDto[]> {
        try {
            return await this.simpleProductQuery({
                condition: condition,
                many: true,
            });
        } catch (e) {
            return {
                message: 'Error retrieving all simple products',
                errors: [
                    {
                        message: e.message,
                    },
                    {
                        status: 999,
                    },
                ],
            };
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} product`;
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return updateProductDto;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }

    protected async productExists({
        sku,
        name,
    }: {
        sku: string;
        name: string;
    }): Promise<boolean> {
        try {
            return await this.entityManager
                .getRepository(SimpleProduct)
                .createQueryBuilder('simple')
                .where('simple.sku =:sku', { sku: sku })
                .orWhere('simple.name =:name', { name: name })
                .cache(true)
                .getExists();
        } catch (e) {
            return false;
        }
    }

    protected async simpleProductQuery({
        condition,
        many,
    }: {
        condition: AttributeConditionsDto;
        many: boolean;
    }): Promise<any[]> {
        let where = '';
        let query = null;
        if (condition.filter.code && condition.filter.value) {
            where =
                'simple.' +
                condition.filter.code +
                ' = :' +
                condition.filter.code;
            query = {};
            query[condition.filter.code] = condition.filter.value;
        }

        const options: boolean = condition.relations.includeOptions;
        const rules: boolean = condition.relations.includeRules;

        if (!many && options && rules) {
            return [
                await this.entityManager
                    .getRepository(SimpleProduct)
                    .createQueryBuilder('simple')
                    .where(where, query)
                    // .orderBy('options.id', 'ASC')
                    .getOne(),
            ];
        }

        // Multiple Records
        const skip = (condition.page - 1) * condition.limit;

        if (many && options && rules) {
            return [
                await this.entityManager
                    .getRepository(SimpleProduct)
                    .createQueryBuilder('simple')
                    .where(where, query)
                    // .orderBy('options.id', 'ASC')
                    .skip(skip)
                    .take(condition.limit)
                    .getMany(),
            ];
        }

        return await this.entityManager
            .getRepository(SimpleProduct)
            .createQueryBuilder('simple')
            .where(where, query)
            // .orderBy('options.id', 'ASC')
            .skip(skip)
            .take(condition.limit)
            .getMany();
    }
}
