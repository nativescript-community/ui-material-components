const copy = require('recursive-copy');
const through = require('through2');

const options = {
    overwrite: true,
    expand: true,
    dot: true,
    junk: true,
    filter: ['**/*'],
    rename (filePath) {
        return filePath.replace(/(.*)\.js(\.map)?$/, '$1.mjs$2');
    },
    transform (src, dest, stats) {
        return through(function (chunk, enc, done) {
            const output = chunk.toString().replace(/((?:(?:"file":")| sourceMappingURL=).*)\.js(\.map)?/g, '$1.mjs$2');
            done(null, output);
        });
    },
};

copy('./build/esm', './', options)
    // .on(copy.events.COPY_FILE_START, function (copyOperation) {
    //     console.info('Copying file ' + copyOperation.src + '...');
    // })
    .on(copy.events.COPY_FILE_COMPLETE, function (copyOperation) {
        console.info('Copied to ' + copyOperation.dest);
    })
    .on(copy.events.ERROR, function (error, copyOperation) {
        console.error('Unable to copy ' + copyOperation.dest);
    })
    .then(function (results) {
        console.info(results.length + ' file(s) copied');

    })
    .catch(function (error) {
        return console.error('Copy failed: ' + error);
    });
