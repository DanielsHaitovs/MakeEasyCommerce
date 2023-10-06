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
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';

@Injectable()
export class StoreAttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly attributeHelper: AttributeHelperService,
        private readonly storeHelper: StoreHelperService,
    ) {}

    async create({
        createAttribute,
    }: {
        createAttribute: CreateStoreAttributeI;
    }): Promise<StoreAttributeResponseI> {
        const check = await this.storeHelper.ifAttributeExists({
            storeViewId: createAttribute.storeView,
            relatedAttributeId: createAttribute.relatedAttribute,
        });
        if (check === true) {
            return {
                status: '770',
                message: 'Duplicate',
                error: {
                    message: 'Store Attribute already exists',
                    in: 'Store Attribute Entity',
                },
            };
        }

        const defaultAttributeCode = await this.getAttributeCode({
            attributeId: createAttribute.relatedAttribute,
        });

        if (defaultAttributeCode === null || defaultAttributeCode.length < 1) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: 'Default Attribute code not found',
                    in: 'Store Attribute Entity',
                },
            };
        }
        createAttribute.description.code = defaultAttributeCode;

        try {
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

    async getAttributeCode({
        attributeId,
    }: {
        attributeId: number;
    }): Promise<string> {
        return (
            await this.storeHelper.findAttributeWithCode({
                relatedAttributeId: attributeId,
            })
        ).description.code;
    }

    async createStoreViewRule({
        rule,
    }: {
        rule: CreateStoreRuleI;
    }): Promise<any> {
        return await this.entityManager.save(StoreRule, rule);
    }

    // ???? :D
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
