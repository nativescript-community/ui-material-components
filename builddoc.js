// @ts-check

const td = require('typedoc');
const ts = require('typescript');
const path = require('path');
const globby = require('globby');

const typedocJson = require('./typedoc');

/**
 * @param {Object} options
 *  @param {string} options.entryPoint
 *  @param {string} options.outDir
 * @param {Partial<import('typedoc').TypeDocOptions>} [typeDocOptions]
 */
const createTypeScriptApiDocs = (exports.createTypeScriptApiDocs = async ({ entryPoint, outDir }, typeDocOptions) => {
    const app = new td.Application();
    app.options.addReader(new td.TSConfigReader());
    console.log('createTypeScriptApiDocs', typeDocOptions);
    const files = await globby(['src/**/*.d.ts', 'src/**/index.ts', '!**/references.d.ts', '!**/appbar', '!**/page', '!**/typings', '!**/angular', '!**/vue', '!**/react'], {
        absolute: true,
        cwd: path.join(process.cwd())
    });
    console.log('files', files);
    app.bootstrap({
        tsconfig: 'tsconfig.json',
        ...typedocJson,
        ...typeDocOptions,
        entryPoints: files
    });
    //@ts-ignore
    app.options.setCompilerOptions(files, {
        esModuleInterop: true
    });
    const program = ts.createProgram(app.options.getFileNames(), app.options.getCompilerOptions());

    const project = app.converter.convert(app.expandInputFiles(app.options.getValue('entryPoints')), program);

    if (project) {
        await app.generateDocs(project, outDir);
    } else {
        throw new Error(`Error creating the TypeScript API docs for ${entryPoint}.`);
    }
});
// app.generateDocs(project, "./docs");
// app.generateJson(project, "./docs.json");

createTypeScriptApiDocs({ outDir: './docs' });
