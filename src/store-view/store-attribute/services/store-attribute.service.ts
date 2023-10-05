import { Injectable } from '@nestjs/common';
import { UpdateStoreAttributeDto } from '../dto/update-store-attribute.dto';
import {
    CreateStoreAttributeI,
    CreateStoreRuleI,
    StoreAttributeResponseI,
} from '../interfaces/store-attribute.interface';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { StoreAttribute } from '../entities/store-attribute.entity';
import { StoreRule } from '../entities/store-attributes/attribute-rule.entity';
import { StoreAttributeDescription } from '../entities/store-attributes/attributes-description.entity';
import { AttributeHelperService } from '@src/base/services/helper/attributes/attribute-helper.service';
import { OrderType } from '@src/base/enum/query/query.enum';
import { GetAttributeI } from '@src/attribute/interfaces/attribute.interface';

@Injectable()
export class StoreAttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly attributeHelper: AttributeHelperService,
    ) {}

    async create({
        createAttribute,
    }: {
        createAttribute: CreateStoreAttributeI;
    }): Promise<StoreAttributeResponseI> {
        const check = await this.ifExists({
            storeViewId: 0,
            relatedAttributeId: createAttribute.relatedAttribute,
        });
        if (check) {
            return {
                status: '770',
                message: 'Duplicate',
                error: {
                    message: 'Attribute already exists',
                    in: 'Attribute Entity',
                },
            };
        }
        try {
            // console.log(createAttribute);
            console.log(
                this.entityManager.create(StoreAttributeDescription, {
                    description: createAttribute.description,
                }),
            );
            // return null;
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(
                    StoreAttribute,
                    this.entityManager.create(StoreAttribute, {
                        attributes: this.entityManager.create(
                            StoreAttributeDescription,
                            {
                                description: createAttribute.description,
                            },
                        ),
                        ...createAttribute,
                    }),
                ),
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Store Attribute Entity',
                },
            };
        }
    }

    findAll() {
        return `This action returns all storeAttribute`;
    }

    findOne(id: number) {
        return `This action returns a #${id} storeAttribute`;
    }

    update(id: number, updateStoreAttributeDto: UpdateStoreAttributeDto) {
        return `This action updates a #${id} storeAttribute`;
    }

    remove(id: number) {
        return `This action removes a #${id} storeAttribute`;
    }

    async ifExists({
        storeViewId,
        relatedAttributeId,
    }: {
        storeViewId: number;
        relatedAttributeId: number;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(StoreAttribute)
            .createQueryBuilder('storeViewAttributes')
            .where('storeViewAttributes.storeView = :storeView', {
                storeView: storeViewId,
            })
            .andWhere(
                'storeViewAttributes.relatedAttribute = :relatedAttribute',
                { relatedAttribute: relatedAttributeId },
            )
            .getExists();
    }

    async isDefault({
        storeViewId,
        relatedAttributeId,
    }: {
        storeViewId: number;
        relatedAttributeId: number;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(StoreAttribute)
            .createQueryBuilder('storeViewAttributes')
            .where('storeViewAttributes.storeView = :storeView', {
                storeView: storeViewId,
            })
            .andWhere(
                'storeViewAttributes.relatedAttribute = :relatedAttribute',
                { relatedAttribute: relatedAttributeId },
            )
            .andWhere('storeViewAttributes.useDefault = :useDefault', {
                useDefault: true,
            })
            .getExists();
    }

    async getAttributeCode({
        attributeId,
    }: {
        attributeId: number;
    }): Promise<StoreAttributeResponseI> {
        const { result } =
            await this.attributeHelper.singleConditionAttributeQuery({
                filters: {
                    page: 1,
                    limit: 1,
                    orderBy: null,
                    orderDirection: OrderType.NO,
                    columnName: 'id',
                    value: attributeId,
                    select: ['id', 'description.code'],
                    joinOptions: false,
                    joinRule: true,
                    many: false,
                },
            });

        return null;
    }

    async createStoreViewRule({
        rule,
    }: {
        rule: CreateStoreRuleI;
    }): Promise<any> {
        return await this.entityManager.save(StoreRule, rule);
    }

    toSingleRecord({
        attribute,
    }: {
        attribute: GetAttributeI | GetAttributeI[];
    }): GetAttributeI | null {
        if (Array.isArray(attribute)) {
            return null;
        }

        return attribute;
    }
}
