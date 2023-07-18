import path from "path";

import { Command } from "commander";
import { serve } from "@cujsnote/local-api";

interface LocalApiError {
    code: string;
}


const isProduction = process.env.NODE_ENV === 'production';
export const serveCommand = new Command()
    .command('serve [filename]')
    .description('open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action(async (filename = 'notebook.js', options: { port: string }) => {

        const isLocalApiError = (err: any): err is LocalApiError => {
            return typeof err.code === 'string';
        }

        const dir = path.join(process.cwd(), path.dirname(filename));
        try {
            await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
            console.log(
                `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
            )
        } catch (error) {
            if (isLocalApiError(error)) {
                if (error.code === 'EADDRINUSE') {
                    console.error(`Port is in use. Try running on different port.`)
                } else if (error instanceof Error) {
                    console.error(`Here is the problem`, error.message);
                }
            }
            process.exit(1);
        }
    })



