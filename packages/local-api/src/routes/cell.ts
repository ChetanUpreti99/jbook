import express from "express";
import path from "path";
import fs from "fs/promises";


interface LocalApiError {
    code: string;
}

interface Cell {
    id: string;
    content: string;
    type: 'code' | 'text';
}


export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();
    router.use(express.json());


    const fullPath = path.join(dir, filename);

    router.get('/cells', async (req, res) => {

        const isLocalApiError = (err: any): err is LocalApiError => {
            return typeof err.code === 'string';
        }

        try {
            // read the file
            // parse a list of cells out of it.
            // Send list of cells back to the browser
            const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
            if (result && result.length) {
                res.send(JSON.parse(result));
            } else {
                res.send([]);
            }

        } catch (error) {
            if (isLocalApiError(error)) {
                if (error.code === 'ENOENT') {
                    await fs.writeFile(fullPath, "[]", "utf-8");
                    res.send([]);
                }
            } else {
                throw error;
            }
        }
    })


    router.post('/cells', async (req, res) => {

        // Take the list of cells from req object
        // serialize them

        const { cells }: { cells: Cell[] } = req.body;

        // Write the cells into the file

        await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
        res.send({ status: 'ok' });

    })

    return router;
}

