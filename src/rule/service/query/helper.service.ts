import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AttributeRule, RuleAlias, RuleIndex } from '@src/rule/entities/rule.entity';

import { GetRuleI, RuleResponseI } from '@src/rule/interface/get-rule.interface';
import { RuleQueryFilterI } from '@src/rule/interface/rule.interface';

import { CreateRuleDto } from '@src/rule/dto/create-rule.dto';

import { RuleQueryService } from './query.service';
import { RuleQueryDto } from '@src/rule/dto/filter.dto';
import { HandlerService } from '@src/mec/service/handler/query.service';

@Injectable()
export class RuleHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly queryService: RuleQueryService,
        private readonly handlerService: HandlerService
    ) {}

    /**
     * This method is used to prepare a rule before saving it.
     *
     * @param {Object} createRule - An object of type CreateRuleDto containing the details of the rule to be created.
     *
     * @returns {PrepareRuleResponseI} - Returns an object of type PrepareRuleResponseI.
     * If the rule is successfully prepared, the method returns an object with a status of '200' and the prepared rule.
     * If the rule cannot be prepared, the method returns null.
     *
     * @throws {Error} - Throws an error if the rule cannot be prepared.
     */
    prepareRule({ createRule }: { createRule: CreateRuleDto }): RuleResponseI<CreateRuleDto> {
        try {
            // Attempt to create the rule
            const result = this.entityManager.create(AttributeRule, createRule);

            // If the rule is successfully created and either the front or back is defined, return the rule
            if (result != undefined && Object.keys(result).length > 0) {
                return {
                    status: '200',
                    result
                };
            }

            // If the rule cannot be created, return null
            return null;
        } catch (error) {
            // If an error occurs, cast it to an Error object
            const e = error as Error;
            // Handle the error using the handler service
            return this.handlerService.handleError({
                e,
                message: 'Could Not Prepare Rule before save',
                where: 'Rule Helper -> prepareRule',
                status: '666',
                log: {
                    path: 'rule/error.log',
                    action: 'Prepare Rule',
                    name: 'Rule Helper'
                }
            });
        }
    }

    /**
     * This method is used to filter a query based on provided filters.
     *
     * @param {Object} filters - An object of type RuleQueryDto containing the filters to apply to the query.
     *
     * @returns {Promise<RuleResponseI>} - Returns a promise that resolves to an object of type RuleResponseI.
     * If the query is successful, the promise resolves to the filtered rules.
     * If the query fails, the promise resolves to an error object with details about the error.
     *
     * @throws {Error} - Throws an error if the query fails.
     */
    async filterQuery({ filters }: { filters: RuleQueryDto }): Promise<RuleResponseI<GetRuleI>> {
        // Create a new query filter using the provided filters
        const ruleQuery: RuleQueryFilterI = this.queryService.queryFilter({
            filters,
            alias: RuleAlias
        });

        // If the query filter does not contain a message, attempt to execute the query
        if (ruleQuery.message === undefined) {
            try {
                // Enable caching for the query and set the index to use
                ruleQuery.query.cache(true);
                ruleQuery.query.useIndex(RuleIndex);

                // If the query filter is set to return many results, attempt to get many results
                if (ruleQuery.many) {
                    const rules: GetRuleI[] = await Promise.resolve(ruleQuery.query.getMany());

                    // If the query returns one or more results, return the results
                    if (rules != undefined && rules != null && rules.length > 0 && Object.keys(rules[0]).length > 0) {
                        return {
                            status: '200',
                            result: rules
                        };
                    }

                    // If the query does not return a result, return null
                    return null;
                }

                // If the query filter is not set to return many results, attempt to get one result
                const rule: GetRuleI = await Promise.resolve(ruleQuery.query.getOne());

                // If the query returns a result, return the result
                if (rule != undefined && rule.id != undefined) {
                    return {
                        status: '200',
                        result: rule
                    };
                }

                // If the query does not return a result, return null
                return null;
            } catch (error) {
                // If an error occurs, cast it to an Error object
                const e = error as Error;
                // Handle the error using the handler service
                return this.handlerService.handleError({
                    e,
                    message: 'Could not filter Query',
                    where: 'Rule Helper -> filterQuery',
                    status: '666',
                    log: {
                        path: 'rule/query/error.log',
                        action: 'Filter Query',
                        name: 'Rule Helper'
                    }
                });
            }
        }

        // If the query filter contains a message, return not found status with the message
        return {
            status: '404',
            message: ruleQuery.message
        };
    }
}
