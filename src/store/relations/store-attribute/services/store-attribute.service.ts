import { Injectable } from '@nestjs/common';
import { UpdateStoreAttributeDto } from '../dto/update-store-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { StoreAttributeResponseI } from '../interface/store-attribute.interface';
import { StoreAttribute } from '../entities/store-attribute.entity';
import { CreateStoreAttributeDto } from '../dto/create-store-attribute.dto';
import { GetAttributeI } from '@src/attribute/interfaces/attribute.interface';
import { StoreViewRule } from '../entities/store-attribute/attribute-rule.entity';

@Injectable()
export class StoreAttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly storeHelper: StoreHelperService,
    ) {}

    async create({
        createAttribute,
    }: {
        createAttribute: CreateStoreAttributeDto;
    }): Promise<StoreAttributeResponseI> {
        const check = await this.storeHelper.ifAttributeExists({
            storeViewId: createAttribute.storeView,
            relatedAttributeId: createAttribute.defaultAttribute,
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
            attributeId: createAttribute.defaultAttribute,
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

        createAttribute.storeAttribute.description.code = defaultAttributeCode;
        createAttribute.rule.storeView = createAttribute.storeView;
        try {
            const newStoreAttribute = await this.entityManager.save(
                StoreAttribute,
                this.entityManager.create(StoreAttribute, {
                    rule: this.entityManager.create(
                        StoreViewRule,
                        createAttribute.rule,
                    ),
                    ...createAttribute,
                }),
            );

            console.log(newStoreAttribute);
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
        const defaultAttribute: GetAttributeI =
            await this.storeHelper.findAttributeDefaultCode({
                relatedAttributeId: attributeId,
            });
        console.log(defaultAttribute);
        return defaultAttribute.description.code;
    }
}
