import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateAttributeRuleDto } from '@src/attribute/dto/attributes/rule/attribute-rule.dto';
import { CreateAttributeDto } from '@src/attribute/dto/create-attribute.dto';
import { Attribute } from '@src/attribute/entities/attribute.entity';
import { CreateAttributeI } from '@src/attribute/interface/attribute.interface';
import { CreateAttributeRuleI } from '@src/attribute/interface/attributes/rule/attribute-rule.interface';
import { Rule } from '@src/rule/entities/rule.entity';
import { EntityManager, EntityTarget, SelectQueryBuilder } from 'typeorm';
import { AttributeQueryFilterDto } from '@src/mec/dto/query/attribute/attribute-filter.dto';
import {
    AttributeResponseI,
    GetAttributeI,
} from '@src/attribute/interface/get-attribute.interface';
import { DataHelperService } from '../../../utils/data-help.service';
import { AttributeQueryService } from './attribute-query.service';

export const AttributeRelationsAlias = ['options', 'rule'];
export const alias = 'attribute';
export const indexKey = 'ik_attribute_index';

@Injectable()
export class AttributeHelperService extends AttributeQueryService {
    constructor(
        @InjectEntityManager()
        private readonly attributeManager: EntityManager,
        private readonly attributeDataHelper: DataHelperService,
    ) {
        super(attributeManager, attributeDataHelper);
    }

    prepareAttribute({
        createAttribute,
    }: {
        createAttribute: CreateAttributeDto;
    }): CreateAttributeI {
        return this.attributeManager.create(Attribute, createAttribute);
    }

    prepareAttributeRule({
        createRuleDto,
    }: {
        createRuleDto: CreateAttributeRuleDto;
    }): CreateAttributeRuleI {
        return this.attributeManager.create(Rule, createRuleDto);
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
            .createQueryBuilder(alias)
            .where(`${alias}.name = :name`, { name })
            .orWhere(`${alias}.code = :code`, { code })
            .cache(true)
            .useIndex(indexKey)
            .getExists();
    }

    async attributeQuery({
        filters,
    }: {
        filters: AttributeQueryFilterDto;
    }): Promise<AttributeResponseI> {
        const attributeQuery = this.prepareQueryFilter({ filters, alias });
        if (attributeQuery.message === null) {
            try {
                attributeQuery.query.cache(true);
                attributeQuery.query.useIndex(indexKey);

                const andCount: number = await Promise.resolve(
                    attributeQuery.query.getCount(),
                );

                // if (many) { this approach at some point does not require to resolve amount of items
                // at some point barely, but we can make attempt on predicting
                // meanwhile not a big deal at current point! ONLY 31/10/23
                if (andCount > 1) {
                    const attributes: GetAttributeI[] = await Promise.resolve(
                        attributeQuery.query.getMany(),
                    );

                    if (attributes != null && attributes.length > 0) {
                        return {
                            status: '200',
                            message: 'test',
                            result: attributes,
                        };
                    }

                    return {
                        status: '404',
                        message: 'Ups, Error',
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
                    message: 'Ups, Error',
                    error: {
                        in: 'attributeQuery',
                        message: 'Not found',
                    },
                };
            } catch (e) {
                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        in: 'attributeQuery',
                        message: e.message,
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

    private async resolveQuery<Entity>({
        query,
    }: {
        entity: EntityTarget<Entity>;
        query: SelectQueryBuilder<Entity>;
    }) {
        return await Promise.resolve(query);
    }
}
