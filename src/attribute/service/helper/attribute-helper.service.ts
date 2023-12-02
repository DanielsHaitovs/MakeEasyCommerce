import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    Attribute,
    AttributeAlias,
    AttributesIndex,
} from '@src/attribute/entities/attribute.entity';

import { AttributeQueryService } from '../query/attribute-query.service';

import { CreateAttributeShortDto } from '@src/attribute/dto/create-attribute.dto';
import { AttributeQueryFilterDto } from '@src/attribute/dto/filter/attribute-filter.dto';
import {
    AttributeQueryFilterI,
    AttributeResponseI,
    CreateAttributeI,
    GetAttributeI,
} from '@src/attribute/interface/attribute.interface';

@Injectable()
export class AttributeHelperService {
    constructor(
        @InjectEntityManager()
        private readonly attributeManager: EntityManager,
        private readonly queryService: AttributeQueryService,
    ) {}

    prepareAttribute({
        createAttribute,
    }: {
        createAttribute: CreateAttributeShortDto;
    }): CreateAttributeI {
        return this.attributeManager.create(Attribute, createAttribute);
    }

    async ifExists({
        name,
        code,
    }: {
        name: string;
        code: string;
    }): Promise<boolean> {
        return await this.attributeManager
            .getRepository(Attribute)
            .createQueryBuilder(AttributeAlias)
            .where(`${AttributeAlias}.name = :name`, { name })
            .orWhere(`${AttributeAlias}.code = :code`, { code })
            .cache(true)
            .useIndex(AttributesIndex)
            .getExists();
    }

    async attributeQuery({
        filters,
    }: {
        filters: AttributeQueryFilterDto;
    }): Promise<AttributeResponseI> {
        const attributeQuery: AttributeQueryFilterI =
            this.queryService.queryFilter({
                filters,
                alias: AttributeAlias,
            });
        if (attributeQuery.message === null) {
            try {
                attributeQuery.query.cache(true);
                attributeQuery.query.useIndex(AttributesIndex);

                // if (many) { Current approach at some point does not require to resolve amount of items
                // at some point barely, but we can make attempt on predicting
                // meanwhile not a big deal at current point! ONLY 31/10/23
                const andCount: number = await Promise.resolve(
                    attributeQuery.query.getCount(),
                );

                if (andCount > 1) {
                    const attributes: GetAttributeI[] = await Promise.resolve(
                        attributeQuery.query.getMany(),
                    );

                    if (attributes.length > 0) {
                        return {
                            status: '200',
                            message: 'Success',
                            result: attributes,
                        };
                    }

                    return {
                        status: '404',
                        message: 'Ups',
                        error: {
                            in: 'attributeQuery',
                            message: 'Not found',
                        },
                    };
                }

                const attribute: GetAttributeI = await Promise.resolve(
                    attributeQuery.query.getOne(),
                );

                if (attribute != null && attribute.id != undefined) {
                    return {
                        status: '200',
                        message: 'Success',
                        result: attribute,
                    };
                }

                return {
                    status: '404',
                    message: 'Ups',
                    error: {
                        in: 'attributeQuery',
                        message: 'Not found',
                    },
                };
            } catch (e) {
                const error = e as Error;

                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        in: 'attributeQuery',
                        message: error.message,
                    },
                };
            }
        }

        return {
            status: '666',
            message: 'Ups, Error',
            error: {
                message: attributeQuery.message,
                in: 'Attribute Helper -> attributeQuery',
            },
        };
    }
}
