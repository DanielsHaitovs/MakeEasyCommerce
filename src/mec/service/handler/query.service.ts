import { QueryResponseDto } from '@src/mec/dto/query/response.dto';
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
    handleError({
        e,
        message,
        name,
        where,
        logPath
    }: {
        e: Error;
        message: string;
        name: string;
        where: string;
        logPath?: string;
    }): QueryResponseDto {
        const status = this.buildResponseObject({ e, message, name, where, type: 'error', logPath });
        return {
            status,
            message,
            error: {
                message: e.message,
                in: where
            }
        };
    }

    handleWarning({
        message,
        name,
        where,
        status,
        logPath
    }: {
        message: string;
        name: string;
        where: string;
        status: string;
        logPath?: string;
    }): QueryResponseDto {
        this.buildResponseObject({ message, where, name, type: 'warning', logPath });

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
        name,
        where,
        type,
        status,
        logPath
    }: {
        e?: Error;
        message: string;
        name: string;
        where: string;
        type: 'error' | 'warning';
        status?: string;
        logPath: string;
    }): string {
        const currentDate = new Date();
        let logMessage: string;

        if (status == undefined) {
            status = this.buildResponseStatus({ e });
        }

        if (logPath != undefined) {
            if (e != undefined) {
                logMessage = `Date: ${currentDate.toString()}
                \nAction: in ${name}, Where: ${where}
                \nDescription: ${message}
                \nStatus: ${status}
                \nName: ${e.name}
                \nMessage: ${e.message}
                \nStack: ${e.stack}`;
            } else {
                logMessage = `Date: ${currentDate.toString()}
                \nAction: in ${name}, Where: ${where}
                \nDescription: ${message}
                \nStatus: ${status}`;
            }

            console.log('HANDLER: buildResponseObject:', logMessage);

            const dirPath = `./log/${type}/${logPath}`;
            const dir = path.dirname(dirPath);

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
