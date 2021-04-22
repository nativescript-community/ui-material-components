module.exports = {
    // mode: 'modules',
    out: 'docs',
    exclude: ['**/node_modules/**', '**/*.spec.ts', '*typings*'],
    name: 'Nativescript UI Material Components',
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    tsconfig: 'tsconfig.doc.json',
    readme: 'README.md'
};
