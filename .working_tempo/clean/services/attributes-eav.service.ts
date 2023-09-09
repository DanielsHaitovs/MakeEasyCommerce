import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { AttributeEAV } from '../entities/inheritance/attribute/eav-attribute.entity';
import { AttributeRuleDto } from '../dto/attribute/create-eav-attribute.dto';
import { EAV } from '../entities/eav.entity';
import { GetAttributeDto } from '../dto/attribute/get-eav-attribute.dto';
import { UpdateAttributeDto } from '../dto/attribute/update-eav-attribute.dto';
import { GetEavParentDto, GetParentEavAttributesDto } from '../dto/get-eav.dto';

@Injectable()
export class AttributeEavService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async create({
        rule,
        newAttribute,
    }: {
        rule: AttributeRuleDto;
        newAttribute: any;
    }): Promise<GetAttributeDto> {
        console.log(newAttribute.parent_eav);
        // here we need to find(determine) eav instance where attribute should be assigned.
        const parent_eav = await this.entityManager.findOne(EAV, {
            where: {
                id: newAttribute.parent_eav,
            },
        });

        const new_attribute: GetAttributeDto = this.entityManager.create(
            AttributeEAV,
            {
                rule: rule,
                parent_eav: parent_eav,
                ...newAttribute,
            },
        );

        return await this.entityManager.save(AttributeEAV, new_attribute);
    }

    async findAll({
        parent,
        rule,
    }: {
        parent: boolean;
        rule: boolean;
    }): Promise<any> {
        const where = {
            filter: '',
            value: null,
        };
        const relations = {
            rule: rule,
            parent: parent,
        };
        try {
            return await this.findAttributeEAVQuery({
                where,
                relations,
                many: true,
            });
        } catch (e) {
            return e.message;
        }
    }

    async findOne({
        id,
        parent,
        rule,
    }: {
        id: number;
        parent: boolean;
        rule: boolean;
    }): Promise<any> {
        const where = {
            filter: 'id',
            value: id,
        };
        const relations = {
            parent: parent,
            rule: rule,
        };
        try {
            return (
                await this.findAttributeEAVQuery({
                    where,
                    relations,
                    many: false,
                })
            ).shift();
        } catch (e) {
            return e.message;
        }
    }

    async update({
        id,
        updateAttributeDto,
        rule,
    }: {
        id: number;
        updateAttributeDto: UpdateAttributeDto;
        rule: AttributeRuleDto;
    }): Promise<any> {
        const where = {
            filter: 'id',
            value: id,
        };
        const relations = {
            rule: true,
            parent: true,
        };
        try {
            const existing: GetAttributeDto = (
                await this.findAttributeEAVQuery({
                    where,
                    relations,
                    many: false,
                })
            ).shift();

            if (existing === null) {
                throw 'attribute with id ' + id + ' does not exist';
            }

            existing.rule = rule;
            existing.attribute.description = updateAttributeDto.description;

            return await this.entityManager.save(AttributeEAV, existing);
        } catch (e) {
            return e.message;
        }
    }

    async remove({ id }: { id: number }): Promise<number> {
        const where = {
            filter: 'id',
            value: id,
        };
        const relations = {
            rule: true,
            parent: true,
        };
        const existing: GetAttributeDto = (
            await this.findAttributeEAVQuery({
                where,
                relations,
                many: false,
            })
        ).shift();

        if (existing === null) {
            throw 'attribute with id ' + id + ' does not exist';
        }

        return (await this.entityManager.delete(AttributeEAV, existing))
            .affected;
    }

    protected async findAttributeEAVQuery({
        where,
        relations,
        many,
    }: {
        where: {
            filter: string;
            value: any;
        };
        relations: {
            parent: boolean;
            rule: boolean;
        };
        many: boolean;
    }): Promise<any[]> {
        let condition = '';
        let query = null;
        if (where.filter && where.value) {
            condition = 'attributeEav.' + where.filter + ' = :' + where.filter;
            query = {};
            query[where.filter] = where.value;
        }

        if (!many && relations.parent && relations.rule) {
            return [
                await this.entityManager
                    .getRepository(AttributeEAV)
                    .createQueryBuilder('attributeEav')
                    .leftJoinAndSelect('attributeEav.parent_eav', 'eav')
                    .where(condition, query)
                    .getOne(),
            ];
        }

        if (!many && relations.parent && !relations.rule) {
            return [
                await this.entityManager
                    .getRepository(AttributeEAV)
                    .createQueryBuilder('attributeEav')
                    .select([
                        'attributeEav.id',
                        'attributeEav.attribute.name',
                        'attributeEav.attribute.code',
                        'attributeEav.attribute.description',
                    ])
                    .leftJoinAndSelect('attributeEav.parent_eav', 'eav')
                    .where(condition, query)
                    .getOne(),
            ];
        }

        if (!many && !relations.parent && relations.rule) {
            return [
                await this.entityManager
                    .getRepository(AttributeEAV)
                    .createQueryBuilder('attributeEav')
                    .where(condition, query)
                    .getOne(),
            ];
        }

        if (many && relations.parent && relations.rule) {
            return [
                await this.entityManager
                    .getRepository(AttributeEAV)
                    .createQueryBuilder('attributeEav')
                    .leftJoinAndSelect('attributeEav.parent_eav', 'eav')
                    .where(condition, query)
                    .getMany(),
            ];
        }

        if (many && relations.parent && !relations.rule) {
            return [
                await this.entityManager
                    .getRepository(AttributeEAV)
                    .createQueryBuilder('attributeEav')
                    .select([
                        'attributeEav.id',
                        'attributeEav.attribute.name',
                        'attributeEav.attribute.code',
                        'attributeEav.attribute.description',
                    ])
                    .leftJoinAndSelect('attributeEav.parent_eav', 'eav')
                    .where(condition, query)
                    .getMany(),
            ];
        }

        if (many && !relations.parent && relations.rule) {
            return [
                await this.entityManager
                    .getRepository(AttributeEAV)
                    .createQueryBuilder('attributeEav')
                    .where(condition, query)
                    .getMany(),
            ];
        }

        return await this.entityManager
            .getRepository(AttributeEAV)
            .createQueryBuilder('attributeEav')
            .select([
                'attributeEav.id',
                'attributeEav.attribute.name',
                'attributeEav.attribute.code',
                'attributeEav.attribute.description',
            ])
            .where(condition, query)
            .getMany();
    }
}
