import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UpdateSimpleProductDto } from '@src/product/dto/product-types/simple/update-simple-product.dto';
import { EntityManager } from 'typeorm';
import { ProductAttributeService } from '../../attributes/product-attribute.service';
import { ProductAttributes } from '@src/product/entities/attributes/product-attribute.entity';
import { ProductTypes } from '@src/base/enum/product/product-types.enum';
import {
    GetAttributeOptionsDto,
    GetMappedAttributeOptionsDto,
    GetProductAttributeOptionsList,
} from '@src/product/dto/attributes/options/get-option.dto';
import { SimpleProduct } from '@src/product/entities/products/types/simple-product.entity';
import { SimpleProductOptions } from '@src/product/entities/attributes/options/simple/simple-product-option.entity';
import { CreateSimpleProductDto } from '@src/product/dto/product-types/simple/create-simple-product.dto';
import { GetSimpleProductDto } from '@src/product/dto/product-types/simple/get-simple-product.dto';
import { AttributeType } from '@src/base/enum/attributes/attribute-type.enum';

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
    }): Promise<GetSimpleProductDto> {
        createProductDto.product_type = ProductTypes.SIMPLE;
        const { attribute_values, ...product } = createProductDto;
        const newSimpleProduct: GetSimpleProductDto =
            await this.entityManager.save(
                SimpleProduct,
                this.entityManager.create(SimpleProduct, {
                    product_type: ProductTypes.SIMPLE,
                    ...product,
                }),
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
                    'attribute.description.dataType',
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
                            isActive: 'true',
                        },
                    },
                ])
                .getMany();

        const requestedOptionsEntities: GetMappedAttributeOptionsDto[] = [];
        for (const requestedValues of attribute_values) {
            const attribute = productAttributes.find(
                (attribute) =>
                    attribute.description.code === requestedValues.code,
            );
            if (attribute != undefined) {
                const option = attribute.options.find(
                    (option) => option.value === requestedValues.value,
                );

                if (option != undefined) {
                    requestedOptionsEntities.push({
                        id: attribute.id,
                        name: attribute.description.name,
                        code: attribute.description.code,
                        isRequired: attribute.description.isRequired,
                        options: {
                            id: option.id,
                            value: option.value,
                            parentAttributeId: attribute.id,
                            parentOptionId: option.id,
                        },
                    });
                } else {
                    if (attribute.description.isRequired) {
                        throw new Error(`Missing data for required attribute`);
                    }
                    requestedOptionsEntities.push({
                        id: attribute.id,
                        name: attribute.description.name,
                        code: attribute.description.code,
                        isRequired: attribute.description.isRequired,
                        options: null,
                    });
                }
            }
        }

        for (const entity of requestedOptionsEntities) {
            if (entity.options === null) {
                entity.options = {
                    parentAttributeId: entity.id,
                    parentOptionId: null,
                    id: null,
                    value: null,
                };
            }

            const newProductAttributeOption = this.entityManager.create(
                SimpleProductOptions,
                {
                    simpleProduct: newSimpleProduct,
                    parentOption: entity.options,
                    value: entity.options.value,
                    parentAttribute: {
                        id: entity.id,
                    },
                },
            );
            const savedOptions: GetAttributeOptionsDto =
                await this.entityManager.save(
                    SimpleProductOptions,
                    newProductAttributeOption,
                );

            newSimpleProduct.options = [savedOptions];
        }

        // I need to review this!
        // return does not make sense.
        // I don't need mentioning of product in each object...
        return newSimpleProduct;
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
