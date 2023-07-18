
import express from "express";
import cors from "cors";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cell";

export const serve = (port: number, filename: string, dir: string, userProxy: boolean) => {
    const app = express();
    if (userProxy) {
        app.use(createProxyMiddleware({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent'
        }))
    } else {
        const packagePath = require.resolve('local-client/build/index.html');
        app.use(express.static(path.dirname(packagePath)))
    }
    app.use(createCellsRouter(filename, dir));

    app.use(cors());
    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    })
}