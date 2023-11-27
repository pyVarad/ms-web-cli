import { ParseArgsConfig, parseArgs } from 'node:util';
import { errorMessage } from '../constants';

/**
 * Parse Arguments
 * @returns { [id: string]: boolean }
 */

const argumentParser = (): {
    [longOption: string]: string | boolean | (string | boolean)[];
} => {
    try {
        const base: ParseArgsConfig = {
            options: {
                create: {
                    type: 'boolean',
                    short: 'c'
                },
                update: {
                    type: 'boolean',
                    short: 'u'
                }
            }
        };

        const args = parseArgs(base);
        return args.values;
    } catch {
        throw Error(errorMessage);
    }
};

export default argumentParser;
