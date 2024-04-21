import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { OptionResponseDto } from '@src/attribute/dto/options/get-option.dto';
import { AttributeOptionString } from '@src/attribute/entities/options/string-option.entity';
import { UpdateNumberOptionDto, UpdateOptionDto, UpdateStringOptionDto } from '@src/attribute/dto/options/update-option.dto';
import { AttributeOptionNumber } from '@src/attribute/entities/options/number-option.entity';
import { AttributeType } from '@src/attribute/enum/attribute.enum';

@Injectable()
export class OptionUpdateService {
    private logPath = 'attribute/options/error.log';

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService
    ) {}

    async update({ type, updateOptions }: { type: AttributeType; updateOptions: UpdateOptionDto }): Promise<OptionResponseDto> {
        // Check if the type is provided
        if (type === undefined) {
            throw new BadRequestException('Attribute Option Type is missing to create attribute option');
        }

        try {
            // Depending on the type, create the appropriate options
            switch (type) {
                case AttributeType.Number:
                    return await this.updateNumberOption(updateOptions.numberOptions);
                case AttributeType.String:
                    return await this.updateStringOption(updateOptions.stringOptions);
                default:
                    throw new BadRequestException('Provided Invalid Option Type');
            }
        } catch (error) {
            const e = error as Error;

            // If an error occurs, handle it using the handlerService
            return this.handlerService.handleError({
                e,
                message: 'Could Not Update Attribute Options By Type',
                where: this.update.name,
                name: OptionUpdateService.name,
                logPath: this.logPath
            });
        }
    }

    async updateStringOption(updateOption: UpdateStringOptionDto[]): Promise<OptionResponseDto> {
        try {
            const promises = updateOption.map((option) => {
                return this.entityManager
                    .createQueryBuilder()
                    .update(AttributeOptionString)
                    .set(option)
                    .where('id = :id', { id: option.id })
                    .execute();
            });

            await Promise.all(promises);

            return {
                status: '200'
            };
        } catch (error) {
            const e = error as Error;

            return this.handlerService.handleError({
                e,
                message: 'Could not update String Option',
                where: this.updateStringOption.name,
                name: OptionUpdateService.name,
                logPath: this.logPath
            });
        }
    }

    async updateNumberOption(updateOption: UpdateNumberOptionDto[]): Promise<OptionResponseDto> {
        try {
            const promises = updateOption.map((option) => {
                return this.entityManager
                    .createQueryBuilder()
                    .update(AttributeOptionNumber)
                    .set(option)
                    .where('id = :id', { id: option.id })
                    .execute();
            });
            await Promise.all(promises);

            return {
                status: '200'
            };
        } catch (error) {
            const e = error as Error;

            return this.handlerService.handleError({
                e,
                message: 'Could not update Number Option',
                where: this.updateNumberOption.name,
                name: OptionUpdateService.name,
                logPath: this.logPath
            });
        }
    }
}
