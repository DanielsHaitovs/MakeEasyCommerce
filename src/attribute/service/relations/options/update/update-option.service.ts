import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { GetStringOptionDto } from '@src/attribute/dto/options/get-option.dto';
import { AttributeOptionString } from '@src/attribute/entities/options/string-option.entity';
import { UpdateStringOptionDto } from '@src/attribute/dto/options/update-option.dto';

@Injectable()
export class OptionUpdateService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService
    ) {}

    async updateStringOption(createOption: UpdateStringOptionDto[], optionIds: number[]): Promise<GetStringOptionDto[]> {
        try {
            // Create a new attribute instance with the provided data
            // const attribute = this.entityManager.create(Attribute);
            if (optionIds === undefined || optionIds.length < 1) {
                optionIds = createOption.flatMap((option) => option.id);
            }

            return await this.entityManager.save(AttributeOptionString, createOption);
        } catch (error) {
            const e = error as Error;

            this.handlerService.handleError<GetStringOptionDto>({
                e,
                message: 'Could not save String Option',
                where: 'Option Service this.createStringOption',
                log: {
                    path: 'option/error.log',
                    action: 'Create String Option',
                    name: 'Option Service'
                }
            });

            return null;
        }
    }

    // TO DO
    // Update Number Option
    // Update Boolean Option
}
