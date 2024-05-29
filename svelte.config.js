const sveltePreprocess = require('svelte-preprocess');
// const svelteNativePreprocessor = require('svelte-native-preprocessor');

module.exports = {
    compilerOptions: {
        namespace: 'foreign'
    },
    preprocess: [
        sveltePreprocess({
            typescript: {
                tsconfigFile:'./tools/tsconfig.eslint.json',
                compilerOptions: {
                    target: 'es2020'
                }
            }
        })
        // svelteNativePreprocessor()
    ]
};
