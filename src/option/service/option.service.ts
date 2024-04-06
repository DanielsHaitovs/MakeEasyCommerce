import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateBooleanOptionDto, CreateNumberOptionDto, CreateOptionDto, CreateStringOptionDto } from '../dto/create-option.dto';
import { OptionType } from '../enum/option.enum';
import { GetBooleanOptionDto, GetNumberOptionDto, GetStringOptionDto, OptionResponseDto } from '../dto/get-option.dto';
import { AttributeOptionString } from '../entities/string-option.entity';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { AttributeOptionNumber } from '../entities/number-option.entity';
import { AttributeOptionBoolean } from '../entities/boolean-option.entity';

@Injectable()
export class OptionService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService
    ) {}

    async createOption({
        createOption,
        optionType
    }: {
        createOption: CreateOptionDto;
        optionType: OptionType;
    }): Promise<OptionResponseDto> {
        switch (optionType) {
            case OptionType.STRING:
                return await this.createStringOption({ data: createOption.data.toString() });
            case OptionType.NUMBER:
                return await this.createNumberOption({ data: Number(createOption.data) });
            case OptionType.BOOLEAN:
                return await this.createBooleanOption({ data: Boolean(createOption.data) });
            default:
                throw new Error('Invalid option type');
        }
    }

    async createStringOption(createOption: CreateStringOptionDto): Promise<OptionResponseDto> {
        try {
            const option: GetStringOptionDto = await this.entityManager.save(AttributeOptionString, createOption);
            return { status: '200', result: option };
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

    async createNumberOption(createOption: CreateNumberOptionDto): Promise<OptionResponseDto> {
        try {
            const option: GetNumberOptionDto = await this.entityManager.save(AttributeOptionNumber, createOption);
            return { status: '200', result: option };
        } catch (error) {
            const e = error as Error;

            this.handlerService.handleError<GetBooleanOptionDto>({
                e,
                message: 'Could not save Number Option',
                where: 'Option Service this.createNumberOption',
                log: {
                    path: 'option/error.log',
                    action: 'Create Boolean Option',
                    name: 'Option Service'
                }
            });

            return null;
        }
    }

    async createBooleanOption(createOption: CreateBooleanOptionDto): Promise<OptionResponseDto> {
        try {
            const option: GetBooleanOptionDto = await this.entityManager.save(AttributeOptionBoolean, createOption);
            return { status: '200', result: option };
        } catch (error) {
            const e = error as Error;

            this.handlerService.handleError<GetBooleanOptionDto>({
                e,
                message: 'Could not save Boolean Option',
                where: 'Option Service this.createBooleanOption',
                log: {
                    path: 'option/error.log',
                    action: 'Create Boolean Option',
                    name: 'Option Service'
                }
            });

            return null;
        }
    }
}
