const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
    return new Promise((resolve) => {
        fs.mkdir(dest, { recursive: true }, (error, res) => resolve(res));
    })
        .then(
            () =>
                new Promise((resolve) => {
                    fs.readdir(src, { withFileTypes: true }, (error, res) => resolve(res));
                })
        )
        .then((entries) =>
            Promise.all(
                entries.map((entry) => {
                    const srcPath = path.join(src, entry.name);
                    const destPath = path.join(dest, entry.name);

                    return entry.isDirectory()
                        ? copyDir(srcPath, destPath)
                        : new Promise((resolve) => {
                              fs.copyFile(srcPath, destPath, (error, res) => resolve(res));
                          });
                })
            )
        );
}
module.exports = function ($staticConfig, hookArgs) {
    const platform = hookArgs.prepareData.platform;
    const projectData = hookArgs.projectData;
    const dataPath = path.join(__dirname, '..', 'App_Resources', platform === 'android' ? projectData.$devicePlatformsConstants.Android : projectData.$devicePlatformsConstants.iOS);
    if (fs.existsSync(dataPath)) {
        console.log('copying demo snippets App_Resources files');
        if (platform === 'android') {
            return copyDir(dataPath, path.join(projectData.platformsDir, platform, 'app'));
        } else {
        }
    }
};
