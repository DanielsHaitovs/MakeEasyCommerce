import { QueryResponseI } from '@src/mec/interface/query/query.interface';
import * as fs from 'fs';

export class HandlerService {
    handleError<T>({
        e,
        message,
        where,
        status,
        log
    }: {
        e: Error;
        message: string;
        where: string;
        status: string;
        log?: {
            path: string;
            action: string;
            name: string;
        };
    }): QueryResponseI<T> {
        console.log(e);

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
