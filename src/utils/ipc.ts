import { spawn } from 'child_process';
import readline from 'readline';
import event from 'events';

/**
 * Spawn an event on the async process completion.
 */
export const spawnOnCompleteEvent = new event.EventEmitter();

/**
 * Trigger a child process and monitor the logging.
 *
 * @param cmd
 * @param event
 * @param allowUserInteraction
 * @param args
 * @returns
 */
export const ipcPipeEvent = async (
    cmd: string,
    event: string,
    allowUserInteraction: boolean,
    ...args: string[]
): Promise<string> => {
    return new Promise<string>((resolve) => {
        const ipcProc = spawn(cmd, args, {
            shell: allowUserInteraction,
            stdio: ['inherit', 'pipe', 'pipe']
        });

        ipcProc.stdout.pipe(process.stdout);
        ipcProc.stderr.pipe(process.stderr);
        ipcProc.stdout.setEncoding('utf8');

        const lineReader = readline.createInterface({
            input: ipcProc.stdout
        });

        lineReader.on('data', (data) => resolve(data));
        ipcProc.on('close', () => ipcProc.kill('SIGHUP'));

        ipcProc.on('exit', () => {
            ipcProc.unref();
            spawnOnCompleteEvent.emit(`process-${event}-finished`);
        });
    });
};
