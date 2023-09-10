import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateQueryService } from '@src/base/services/query/create/create-query.service';
import { AttributeOption } from '@src/product/entity/product/attributes/relations/options/option.attribute.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class OptionService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly queryService: CreateQueryService,
    ) {}

    protected async prepareOptionsDto({
        createOptionsDto,
    }: {
        createOptionsDto: any[];
    }): Promise<any[]> {
        const preparedOptions: any[] = [];
        const test = [];
        for (const option of createOptionsDto) {
            preparedOptions.push({
                options: {
                    value: option.value,
                },
            });


            // --> This works!
            // test.push(
            //     await this.queryService.prepareEntityQuery(
            //         AttributeOption,
            //         {
            //             value: option.value,
            //         },
            //         AttributeOptionBase,
            //     ),
            // );
            //  <-- This works!
        }
        return preparedOptions;
    }

    // async create({
    //     createOptionsDto,
    // }: {
    //     createOptionsDto: CreateOptionDto[];
    // }): Promise<any> {
    //     return await this.prepareOptionsDto({ createOptionsDto });
    // }
    // async create({
    //     createOptionDto,
    // }: {
    //     createOptionDto: CreateOptionDto;
    // }): Promise<GetSingleOptionDto> {
    //     const newOption = await this.createAndSaveOption({
    //         options: {
    //             value: createOptionDto.value,
    //         },
    //     });

    //     return {
    //         // parentAttributeId: null,
    //         options: { ...newOption },
    //     };
    // }

    // async createManyOptions({
    //     createOptionsDto,
    // }: {
    //     createOptionsDto: CreateOptionDto[];
    // }): Promise<GetOptionsDto> {
    //     const newOption = await this.prepareManyOptions({
    //         createOptionsDto,
    //     });
    //     return null;
    // }

    // async prepareManyOptions({
    //     createOptionsDto,
    // }: {
    //     createOptionsDto: CreateOptionDto[];
    // }): Promise<CreateOptionDto[]> {
    //     const preparedOptions: CreateOptionDto[] = [];
    //     for (const option of createOptionsDto) {
    //         preparedOptions.push(
    //             await this.prepareOption({
    //                 options: {
    //                     value: option.value,
    //                 },
    //             }),
    //         );
    //     }

    //     return preparedOptions;
    // }

    // async prepareOption({
    //     options,
    // }: {
    //     options: {
    //         value: string | number | boolean | Date | JSON;
    //     };
    // }): Promise<CreateOptionDto> {
    //     console.log(options);
    //     return await this.queryService.prepareEntityQuery(
    //         AttributeOption,
    //         options,
    //         AttributeOption,
    //     );
    // }

    // async createAndSaveOption({
    //     options,
    // }: {
    //     options: {
    //         value: string | number | boolean | Date | JSON;
    //     };
    // }): Promise<AttributeOption> {
    //     return await this.queryService.createAndSave(
    //         AttributeOption,
    //         options,
    //         AttributeOption,
    //     );
    // }
}
