import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateQueryService } from '@src/base/services/query/create/create-query.service';
import { CreateAttributeDto } from '@src/product/dto/attributes/attribute/create-attribute.dto';
import { GetAttributeDto } from '@src/product/dto/attributes/attribute/get-attribute.dto';
import { EntityManager } from 'typeorm';
import { OptionService } from './options/option.service';

@Injectable()
export class AttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly queryService: CreateQueryService,
        private readonly optionService: OptionService,
    ) {}

    async create({
        createAttributeDto,
    }: {
        createAttributeDto: CreateAttributeDto;
    }): Promise<GetAttributeDto> {
        const { options, ...attribute } = createAttributeDto;
        // const newAttribute = await this.prepareEntity({
        //     createAttributeDto: attribute,
        // });
        return null;
    }

    // async prepareEntity({
    //     createAttributeDto,
    // }: {
    //     createAttributeDto: createAttributeShortDto;
    // }) {
    //     return await this.queryService.prepareEntityQuery(
    //         ProductAttributes,
    //         createAttributeDto,
    //         GetAttributeDto,
    //     );
    // }
}
