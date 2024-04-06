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
import { GetRuleDto, RuleResponseDto } from '@src/rule/dto/get-rule.dto';
import { UpdateRuleDto } from '@src/rule/dto/update-rule.dto';

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
    prepareRule({ createRule }: { createRule: CreateRuleDto }): CreateRuleDto {
        try {
            // Attempt to create the rule
            const rule = this.entityManager.create(AttributeRule);

            const merged = this.entityManager.merge(AttributeRule, rule, createRule);

            // If the rule is successfully created and either the front or back is defined, return the rule
            if (merged != undefined && Object.keys(merged).length > 0) {
                return merged;
            }

            // If the rule cannot be created, return null
            return null;
        } catch (error) {
            // If an error occurs, cast it to an Error object
            const e = error as Error;
            // Handle the error using the handler service
            this.handlerService.handleError({
                e,
                message: 'Could Not Prepare Rule before save',
                where: 'Rule Helper -> prepareRule',

                log: {
                    path: 'rule/error.log',
                    action: 'Prepare Rule',
                    name: 'Rule Helper'
                }
            });

            return null;
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

    /**
     * Updates a rule with the given id and new rule data.
     *
     * @param {Object} params - The parameters for updating a rule.
     * @param {number} params.id - The id of the rule to update.
     * @param {UpdateRuleDto} params.rule - The new rule data.
     *
     * @returns {Promise<RuleResponseDto>} A Promise that resolves to an object containing the status of the operation and the updated rule.
     * If the rule cannot be updated, a warning message is returned with status '404'.
     * If an error occurs during the operation, it is caught and handled by the `handlerService`.
     *
     * @throws {Error} If there's an error during the operation, it will be caught and handled by the `handlerService`.
     */
    async update({ id, rule }: { id: number; rule: UpdateRuleDto }): Promise<RuleResponseDto> {
        try {
            // Preload the rule to be updated
            const preload: GetRuleDto = await this.entityManager.preload(AttributeRule, { id, ...rule });

            // Check if the rule exists and the id matches
            if (preload != undefined && preload.id === id) {
                // Update the rule
                const update = await this.entityManager.update(AttributeRule, id, preload);

                // Check if the update was successful
                if (update.affected === 1) {
                    return {
                        status: '200',
                        result: preload
                    };
                }
            }

            // Handle the case where the rule could not be updated
            return this.handlerService.handleWarning<GetRuleDto>({
                message: 'Could not update Rule by given ID',
                where: 'Rule Service updateRule this.entityManager.preload',
                status: '404',
                log: {
                    path: 'rule/warning.log',
                    action: 'Update Rule',
                    name: 'Rule Service'
                }
            });
        } catch (error) {
            // Handle any errors that occur during the operation
            const e = error as Error;
            return this.handlerService.handleError<GetRuleDto>({
                e,
                message: 'Could not update Rule by given ID',
                where: 'Rule Service this.entityManager.findOne'
            });
        }
    }

    /**
     * Deletes a rule with the given id.
     *
     * @param {Object} params - The parameters for deleting a rule.
     * @param {number} params.id - The id of the rule to delete.
     *
     * @returns {Promise<RuleResponseDto>} A Promise that resolves to an object containing the status of the operation.
     * If the rule cannot be deleted, a warning message is returned with status '404'.
     * If an error occurs during the operation, it is caught and handled by the `handlerService`.
     *
     * @throws {Error} If there's an error during the operation, it will be caught and handled by the `handlerService`.
     */
    async remove({ id }: { id: number }): Promise<RuleResponseDto> {
        try {
            // Preload the rule to be deleted
            const rule: GetRuleDto = await this.entityManager.preload(AttributeRule, { id });

            // Check if the rule exists and the id matches
            if (rule != undefined && rule.id != undefined && rule.id === id) {
                // Delete the rule
                const result = await this.entityManager.delete(AttributeRule, rule);

                // Check if the deletion was successful
                if (result.affected === 1) {
                    return { status: '200' };
                }
            }

            // Handle the case where the rule could not be deleted
            return this.handlerService.handleWarning<GetRuleDto>({
                message: 'Could not delete Rule by given ID',
                where: 'Rule Service deleteRule this.entityManager.findOne',
                status: '404',
                log: {
                    path: 'rule/warning.log',
                    action: 'Delete Rule',
                    name: 'Rule Service'
                }
            });
        } catch (error) {
            // Handle any errors that occur during the operation
            const e = error as Error;
            return this.handlerService.handleError<GetRuleDto>({
                e,
                message: 'Could not delete Rule by given ID',
                where: 'Rule Service this.entityManager.findOne'
            });
        }
    }
}
