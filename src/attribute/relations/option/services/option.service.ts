import { Injectable } from '@nestjs/common';
import { OptionResponseDto } from '../dto/option.dto';
import { UpdateOptionDto } from '../dto/update-option.dto';
import { CreateOptionDto } from '../dto/post-option.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Option } from '../entities/option.entity';

@Injectable()
export class OptionService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
    async create({
        createOption,
    }: {
        createOption: CreateOptionDto;
    }): Promise<OptionResponseDto> {
        try {
            return {
                result: await this.entityManager.save(
                    Option,
                    this.prepareOption({ createOption }),
                ),
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Option Entity',
                },
            };
        }
    }

    async createMany({
        createOptions,
    }: {
        createOptions: CreateOptionDto[];
    }): Promise<OptionResponseDto> {
        const preparedOptions: CreateOptionDto[] = [];
        for (const option of createOptions) {
            preparedOptions.push(this.prepareOption({ createOption: option }));
        }
        return {
            result: await this.entityManager.save(Option, preparedOptions),
        };
    }

    findAll() {
        return `This action returns all option`;
    }

    findOne(id: number) {
        return `This action returns a #${id} option`;
    }

    update(id: number, updateOptionDto: UpdateOptionDto) {
        return `This action updates a #${id} option`;
    }

    remove(id: number) {
        return `This action removes a #${id} option`;
    }

    protected prepareOption({
        createOption,
    }: {
        createOption: CreateOptionDto;
    }) {
        return this.entityManager.create(Option, createOption);
    }
}
