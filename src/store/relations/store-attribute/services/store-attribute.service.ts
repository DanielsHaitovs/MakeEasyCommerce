import { Injectable } from '@nestjs/common';
import { UpdateStoreAttributeDto } from '../dto/update-store-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import {
    GetStoreAttributeI,
    GetStoreAttributeShortI,
    StoreAttributeResponseI,
    StoreShortAttributeResponseI,
} from '../interface/store-attribute.interface';
import { StoreAttribute } from '../entities/store-attribute.entity';
import {
    CreateStoreAttributeDto,
    CreateStoreAttributeShortDto,
} from '../dto/create-store-attribute.dto';
import { GetAttributeI } from '@src/attribute/interfaces/attribute.interface';
import { StoreViewRule } from '../entities/store-attribute/attribute-rule.entity';
import { StoreAttributeDescription } from '../entities/store-attribute/attributes-description.entity';
import { StoreViewOption } from '../entities/store-attribute/attribute-option.entity';
import {
    CreateStoreOptionI,
    GetStoreOptionI,
} from '../interface/store-attributes/attributes-option.interface';

@Injectable()
export class StoreAttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly storeHelper: StoreHelperService,
    ) {}

    async createShort({
        createAttribute,
    }: {
        createAttribute: CreateStoreAttributeShortDto;
    }): Promise<StoreShortAttributeResponseI> {
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
            const newStoreAttribute: GetStoreAttributeShortI =
                await this.entityManager.save(
                    StoreAttribute,
                    this.entityManager.create(StoreAttribute, {
                        rule: this.entityManager.create(
                            StoreViewRule,
                            createAttribute.rule,
                        ),
                        ...createAttribute,
                    }),
                );

            if (newStoreAttribute === null) {
                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        message: 'Save was successful but return null',
                        in: 'Store Attribute Entity',
                    },
                };
            }

            return {
                status: '200',
                message: 'Success',
                result: newStoreAttribute,
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
            const newStoreAttribute: GetStoreAttributeShortI =
                await this.entityManager.save(
                    StoreAttribute,
                    this.entityManager.create(StoreAttribute, {
                        storeAttribute: this.entityManager.create(
                            StoreAttributeDescription,
                            {
                                storeOption: null,
                                ...createAttribute.storeAttribute,
                            },
                        ),
                        rule: this.entityManager.create(
                            StoreViewRule,
                            createAttribute.rule,
                        ),
                        ...createAttribute,
                    }),
                );

            if (newStoreAttribute === null) {
                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        message: 'Save was successful but return null',
                        in: 'Store Attribute Entity',
                    },
                };
            }

            const prepareOptions: CreateStoreOptionI[] = [];

            createAttribute.storeAttribute.storeOptions.forEach((option) => {
                console.log(option);
                option.storeView = createAttribute.storeView;
                option.storeAttribute = newStoreAttribute.storeAttribute.id;
                prepareOptions.push(
                    this.entityManager.create(StoreViewOption, {
                        storeAttribute: newStoreAttribute.storeAttribute.id,
                        storeView: createAttribute.storeView,
                        parentOption: option.parentOption,
                        value: option.value,
                    }),
                );
            });

            const newStoreAttributeOptions: GetStoreOptionI[] =
                await this.entityManager.save(StoreViewOption, prepareOptions);

            if (newStoreAttributeOptions.length < 1) {
                await this.entityManager.delete(
                    StoreAttribute,
                    newStoreAttribute.id,
                );

                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        message:
                            'Could not save provided store attribute option(s)',
                        in: 'Store Attribute Entity',
                    },
                };
            }

            return {
                status: '200',
                message: 'Success',
                result: {
                    storeAttribute: {
                        storeOptions: newStoreAttributeOptions,
                        description:
                            newStoreAttribute.storeAttribute.description,
                        id: newStoreAttribute.storeAttribute.id,
                    },
                    storeView: newStoreAttribute.storeView,
                    useDefault: newStoreAttribute.useDefault,
                    defaultAttribute: newStoreAttribute.defaultAttribute,
                    rule: newStoreAttribute.rule,
                },
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
        const defaultAttribute: GetAttributeI =
            await this.storeHelper.findAttributeDefaultCode({
                relatedAttributeId: attributeId,
            });
        return defaultAttribute.description.code;
    }
}
