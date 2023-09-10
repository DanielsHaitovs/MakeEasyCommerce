import { Injectable } from '@nestjs/common';
import { UpdateRulesDto } from '../dto/update-rule.dto';
import { CreateRulesDto } from '../dto/post-rule.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { GetRulesDto } from '../dto/get-rule.dto';
import { QueryService } from '@src/base/services/query/query.service';

@Injectable()
export class RuleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly queryService: QueryService,
    ) {}
    async create({
        createRulesDto,
    }: {
        createRulesDto: CreateRulesDto;
    }): Promise<GetRulesDto> {
        // return await this.queryService.(
        //     Rule,
        //     createRulesDto,
        //     CreateRulesDto,
        // );
        return null;
    }

    findAll() {
        return `This action returns all rule`;
    }

    findOne(id: number) {
        return `This action returns a #${id} rule`;
    }

    update(id: number, updateRuleDto: UpdateRulesDto) {
        return `This action updates a #${id} rule`;
    }

    remove(id: number) {
        return `This action removes a #${id} rule`;
    }
}
