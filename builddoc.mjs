import td from 'typedoc';
import ts from 'typescript';
import * as path from 'path';
import {globby} from 'globby';

import typedocJson from './typedoc.js';

/**
 * @param {Object} options
 *  @param {string} options.entryPoint
 *  @param {string} options.outDir
 * @param {Partial<import('typedoc').TypeDocOptions>} [typeDocOptions]
 */
export async function createTypeScriptApiDocs ({ outDir }, typeDocOptions = {}) {
    const app = new td.Application();
    app.options.addReader(new td.TSConfigReader());
    console.log('createTypeScriptApiDocs', typeDocOptions);
    const files = await globby(['src/**/*.d.ts', 'src/**/index.ts', '!**/references.d.ts', '!**/appbar', '!**/page', '!**/typings', '!**/angular', '!**/vue', '!**/react'], {
        absolute: true,
        cwd: path.join(process.cwd())
    });
    console.log('files', files);
    app.bootstrap({
        logger: "console",
        disableSources: true,
        cleanOutputDir: true,
        tsconfig: 'tsconfig.doc.json',
        entryPointStrategy: td.EntryPointStrategy.Expand,
        entryPoints: files,
        ...typedocJson,
        ...typeDocOptions
    });
    //@ts-ignore
    app.options.setCompilerOptions(files, {
        esModuleInterop: true
    });
    // const program = ts.createProgram(app.options.getFileNames(), app.options.getCompilerOptions());

    const project = app.converter.convert(app.getEntryPoints() ?? []);

    if (project) {
        await app.generateDocs(project, outDir);
    } else {
        throw new Error(`Error creating the typedoc project`);
    }
};
// app.generateDocs(project, "./docs");
// app.generateJson(project, "./docs.json");

try {
    await createTypeScriptApiDocs({ outDir: './docs' });
} catch(err) {
    console.error(err);
}
