import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UpdateSimpleProductDto } from '@src/product/dto/product-types/simple/update-simple-product.dto';
import { EntityManager } from 'typeorm';
import { ProductAttributeService } from '../../attributes/product-attribute.service';
import { ProductAttributes } from '@src/product/entities/attributes/product-attribute.entity';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import {
    GetAttributeOptionsDto,
    GetProductAttributeOptionsList,
} from '@src/product/dto/attributes/options/get-option.dto';
import { SimpleProduct } from '@src/product/entities/products/types/simple-product.entity';
import { SimpleProductOptions } from '@src/product/entities/attributes/options/simple/simple-product-option.entity';
import { CreateSimpleProductDto } from '@src/product/dto/product-types/simple/create-simple-product.dto';
import { GetSimpleProductDto } from '@src/product/dto/product-types/simple/get-simple-product.dto';

@Injectable()
export class SimpleProductService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly attributeService: ProductAttributeService,
    ) {}
    async create({
        createProductDto,
    }: {
        createProductDto: CreateSimpleProductDto;
    }): Promise<any> {
        createProductDto.product_type = ProductTypes.SIMPLE;
        const { attribute_values, ...product } = createProductDto;
        const newSimpleProduct: GetSimpleProductDto =
            await this.entityManager.save(
                SimpleProduct,
                this.entityManager.create(SimpleProduct, product),
            );
        const productAttributes: GetProductAttributeOptionsList[] =
            await this.entityManager
                .getRepository(ProductAttributes)
                .createQueryBuilder('attribute')
                .select([
                    'attribute.id',
                    'attribute.description.name',
                    'attribute.description.code',
                    'attribute.description.isRequired',
                ])
                .leftJoinAndMapMany(
                    'attribute.options',
                    'attribute.options',
                    'options',
                )
                .addSelect(['options.id', 'options.value'])
                .where([
                    {
                        description: {
                            // isActive: 'true',
                            isRequired: 'true',
                        },
                    },
                ])
                .getMany();

        const requestedOptionsEntities: GetAttributeOptionsDto[] = [];
        for (const requestedValues of attribute_values) {
            const attribute = productAttributes.find(
                (attribute) =>
                    attribute.description.code === requestedValues.code,
            );
            if (attribute) {
                const option = attribute.options.find(
                    (option) => option.value === requestedValues.value,
                );
                requestedOptionsEntities.push(option);
            } else {
                throw new Error('Missing data for required attribute');
            }
        }

        for (const option of requestedOptionsEntities) {
            const newProductAttributeOption = this.entityManager.create(
                SimpleProductOptions,
                {
                    simpleProduct: newSimpleProduct,
                    parentOption: option,
                    value: option.value,
                    parentAttribute: null,
                },
            );
            await this.entityManager.save(
                SimpleProductOptions,
                newProductAttributeOption,
            );
        }
        return 'This action adds a new product';
    }

    findAll() {
        return `This action returns all product`;
    }

    findOne(id: number) {
        return `This action returns a #${id} product`;
    }

    update(id: number, updateProductDto: UpdateSimpleProductDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
