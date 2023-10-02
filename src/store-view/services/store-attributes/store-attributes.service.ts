import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    CreateRulesI,
    GetRuleI,
} from '@src/attribute/relations/rule/interface/rule.interface';
import { defaultRules } from '@src/base/enum/attributes/rule-type.enum';
import { OrderType } from '@src/base/enum/query/query.enum';
import { AttributeHelperService } from '@src/base/services/helper/attributes/attribute-helper.service';
import { StoreHelperService } from '@src/base/services/helper/store/store-helper.service';
import { StoreViewRule } from '@src/store-view/entities/attributes/attributes-rule.entity';
import { StoreViewAttributes } from '@src/store-view/entities/store-attributes.entity';
import {
    CreateStoreViewAttributeShortI,
    StoreViewAttributeResponseI,
} from '@src/store-view/interfaces/store-attributes/store-attributes.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class StoreViewAttributesService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly attributeHelper: AttributeHelperService,
        private readonly storeHelper: StoreHelperService,
    ) {}

    async createShort({
        createAttributeDto,
    }: {
        createAttributeDto: CreateStoreViewAttributeShortI;
    }): Promise<StoreViewAttributeResponseI> {
        const exists = await this.ifExists({
            storeViewId: createAttributeDto.storeView,
            relatedAttributeId: createAttributeDto.relatedAttribute,
        });

        if (exists) {
            return {
                status: '770',
                message: 'Duplicate',
                error: {
                    message:
                        'Mentioned Store view already has this Attribute record',
                    in: 'Store View Entity',
                },
            };
        }

        // const defaultRules: GetRuleI =
        //     (
        //         await this.attributeHelper.singleConditionAttributeQuery({
        //             filters: {
        //                 page: 1,
        //                 limit: 1,
        //                 orderBy: null,
        //                 orderDirection: OrderType.NO,
        //                 columnName: 'id',
        //                 value: createAttributeDto.relatedAttribute,
        //                 select: ['id', 'rules'],
        //                 joinOptions: false,
        //                 joinRules: true,
        //             },
        //         })
        //     ).result[0].rules || null;

        // if (defaultRules == null) {
        //     return {
        //         status: '666',
        //         message: 'Could not find default attribute rules',
        //         error: {
        //             message:
        //                 'Failed creating store view rule for this attribute',
        //             in: 'Store View Attribute Entity',
        //         },
        //     };
        // }
        try {
            createAttributeDto.useDefault = true;
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(StoreViewAttributes, {
                    rules: defaultRules,
                    ...createAttributeDto,
                }),
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Store View Attribute Entity',
                },
            };
        }
    }

    async ifExists({
        storeViewId,
        relatedAttributeId,
    }: {
        storeViewId: number;
        relatedAttributeId: number;
    }): Promise<boolean> {
        return await this.entityManager
            .getRepository(StoreViewAttributes)
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
            .getRepository(StoreViewAttributes)
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

    async createStoreViewRule({ rule }: { rule: CreateRulesI }): Promise<any> {
        return await this.entityManager.save(StoreViewRule, rule);
    }
}

// protected async ifExists({
//     name,
//     code,
// }: {
//     name: string;
//     code: string;
// }): Promise<boolean> {
//     const attribute = await this.entityManager
//         .getRepository(Attributes)
//         .createQueryBuilder('attributes')
//         .where('attributes.description.name = :name', { name })
//         .orWhere('attributes.description.code = :code', { code })
//         .getExists();
//     if (attribute && attribute != null) {
//         return true;
//     }
//     return false;
// }
// If Exists sounds tricky on the first look, but...
// If we reached this spot then this attribute in fact
// already exists in default table
// We need to check if related attribute
// is mentioned in StoreView Attributes Table with store view ID * that also supposed to be provided in dto
// If its there and default for mentioned store view is false
// Then smth strange, cuz we creating store view record for
// for attribute that already has store view value in this table...
// logically update should perform, but I would rather return error
// saying "OH NO ITS DUPLICATED RECORD"
// If I will not be lazy enough I'll redirect it to update instead of create.
// If I'll be even less lazy I wont do it using save, but will realize
// via actual update.
// const exists = await this.storeHelper.ifExists({
// if (exists) {
//     return {
//         status: '770',
//         message: 'Duplicate',
//         error: {
//             message: 'Store view with this name or code already exist',
//             in: 'Store View Entity',
//         },
//     };
// }
