module.exports = {
    plugins: ['prettier-plugin-svelte'],
    overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
    printWidth: 200,
    semi: true,
    tabWidth: 4,
    trailingComma: 'none',
    singleQuote: true,
    svelteSortOrder: 'options-styles-scripts-markup',
    svelteStrictMode: false,
    svelteBracketNewLine: false,
    svelteIndentScriptAndStyle: true
};
