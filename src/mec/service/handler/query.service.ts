import { LogI, QueryResponseI } from '@src/mec/interface/query/query.interface';
import * as fs from 'fs';
import * as path from 'path';

export const errorStatuses = {
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '409': 'Conflict',
    '500': 'Internal Server Error'
};

export class HandlerService {
    handleError<T>({ e, message, where, log }: { e: Error; message: string; where: string; log?: LogI }): QueryResponseI<T> {
        const status = this.buildResponseObject({ e, message, where, type: 'error', log });

        return {
            status,
            message,
            error: {
                message: e.message,
                in: where
            }
        };
    }

    handleWarning<T>({
        message,
        where,
        status,
        log
    }: {
        message: string;
        where: string;
        status: string;
        log?: {
            path: string;
            action: string;
            name: string;
        };
    }): QueryResponseI<T> {
        this.buildResponseObject({ message, where, type: 'warning', log });

        if (status == undefined) {
            status = this.buildResponseStatus({
                e: {
                    message,
                    name: 'Warning'
                }
            });
        }

        return {
            status,
            error: {
                message,
                in: where
            }
        };
    }

    private buildResponseObject({
        e,
        message,
        where,
        type,
        status,
        log
    }: {
        e?: Error;
        message: string;
        where: string;
        type: 'error' | 'warning';
        status?: string;
        log?: {
            path: string;
            action: string;
            name: string;
        };
    }): string {
        const currentDate = new Date();
        let logMessage: string;

        if (status == undefined) {
            status = this.buildResponseStatus({ e });
        }

        if (log != undefined && log.path != undefined && log.action != undefined && log.name != undefined) {
            if (e != undefined) {
                logMessage = `Date: ${currentDate.toString()}
                \nAction: ${log.action} in ${log.name}, Where: ${where}
                \nDescription: ${message}
                \nStatus: ${status}
                \nName: ${e.name}
                \nMessage: ${e.message}
                \nStack: ${e.stack}`;
            } else {
                logMessage = `Date: ${currentDate.toString()}
                \nAction: ${log.action} in ${log.name}, Where: ${where}
                \nDescription: ${message}
                \nStatus: ${status}`;
            }

            console.log('HANDLER: buildResponseObject:', logMessage);

            const logPath = `./log/${type}/${log.path}`;
            const dir = path.dirname(logPath);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.appendFile(logPath, logMessage, (err) => {
                if (err) {
                    console.error('Failed to write to log file:');
                    throw err;
                }
            });
        }

        return status;
    }

    private buildResponseStatus({ e }: { e: Error }): string {
        if (e === undefined) return '500';
        if (e.message.includes('violates not-null constraint') || e.name === 'TypeError') {
            return '400';
        } else if (e.message.includes('violates foreign key constraint')) {
            if (e.message.includes('eav_attribute_index')) {
                return '400-Attribute Index';
            }
        } else if (e.message.includes('not find any entity') || e.name === 'EntityNotFoundError') {
            return '404';
        } else if (e.message.includes('duplicate key') || e.message.includes('already exists') || e.name === 'ConflictException') {
            return '409';
        } else {
            return '500';
        }
    }
}
