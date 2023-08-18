import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { AttributeEAV } from '../entities/inheritance/attribute/eav-attribute.entity';
import { EavAttributeRuleDto } from '../dto/attribute/create-eav-attribute.dto';
import { EAV } from '../entities/eav.entity';
import { GetEavAttributeDto } from '../dto/attribute/get-eav-attribute.dto';

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
        rule: EavAttributeRuleDto;
        newAttribute: any;
    }): Promise<GetEavAttributeDto> {
        console.log(newAttribute.parent_eav);
        // here we need to find(determine) eav instance where attribute should be assigned.
        const parent_eav = await this.entityManager.findOne(EAV, {
            where: {
                id: newAttribute.parent_eav,
            },
        });

        const new_attribute: GetEavAttributeDto = this.entityManager.create(
            AttributeEAV,
            {
                rule: rule,
                parent_eav: parent_eav,
                ...newAttribute,
            },
        );

        console.log(new_attribute);

        return await this.entityManager.save(AttributeEAV, new_attribute);
    }

    findAll() {
        return `This action returns all eav`;
    }

    async findOne(id: number): Promise<any> {
        return await this.entityManager.findOne(AttributeEAV, {
            where: {
                id: id,
            },
        });
    }

    update(id: number) {
        return `This action updates a #${id} eav`;
    }

    remove(id: number) {
        return `This action removes a #${id} eav`;
    }
}
