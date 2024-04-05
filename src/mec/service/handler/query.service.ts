import { QueryResponseI } from '@src/mec/interface/query/query.interface';
import * as fs from 'fs';

export const errorStatuses = {
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '409': 'Conflict',
    '500': 'Internal Server Error'
};

export class HandlerService {
    handleError<T>({
        e,
        message,
        where,
        log
    }: {
        e: Error;
        message: string;
        where: string;
        log?: {
            path: string;
            action: string;
            name: string;
        };
    }): QueryResponseI<T> {
        console.log(e);
        let status = '';

        if (e.message.includes('violates foreign key constraint')) {
            status = '400';
        } else if (e.message.includes('violates not-null constraint')) {
            status = '400';
        } else if (e.message.includes('not find any entity') || e.name === 'EntityNotFoundError') {
            status = '404';
        } else if (e.message.includes('duplicate key') || e.name === 'ConflictException') {
            status = '409';
        } else {
            status = '500';
        }

        if (log != undefined && log.path != undefined && log.action != undefined && log.name != undefined) {
            const currentDate = new Date();
            const logMessage = `Date: ${currentDate.toString()}
            \nAction: ${log.action} Name:${log.name} Where: ${where}
            \nDescription: ${message}
            \nStatus: ${status}
            \nName: ${e.name}
            \nMessage: ${e.message}
            \nStack: ${e.stack}`;

            console.log('Error:', logMessage);
            fs.appendFile(`./log/error/${log.path}`, logMessage, (err) => {
                if (err) {
                    console.error('Failed to write to log file:', err);
                }
            });
        }

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
        if (log != undefined && log.path != undefined && log.action != undefined && log.name != undefined) {
            const currentDate = new Date();
            const logMessage = `Date: ${currentDate.toString()}
                \nAction: ${log.action}
                \nName:${log.name}
                \nWhere: ${where}
                \nDescription: ${message}
                \nStatus: ${status}
                \n`;

            console.log('Error:', logMessage);
            fs.appendFile(`./log/warning/${log.path}`, logMessage, (err) => {
                if (err) {
                    console.error('Failed to write to log file:', err);
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
}
