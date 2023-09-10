import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateQueryService } from '.working_tempo/base/services/query/create/create-query.service';
import { EntityManager } from 'typeorm';
import { OptionService } from './options/option.service';
import { CreateAttributeDto } from '@src/product/dto/attributes/post.attribute.dto';
import { GetAttributeDto } from '@src/product/dto/attributes/get.attribute.dto';

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
