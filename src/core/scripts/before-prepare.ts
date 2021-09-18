import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

module.exports = function (hookArgs: { projectData /* : IProjectData */; prepareData /* : IPrepareData */ }, $logger) {
    const platform = hookArgs.prepareData.platform;

    if (platform === 'ios') {
        const projectFilePath = dirname(hookArgs.projectData.projectFilePath);
        const podFilePath = join(projectFilePath, 'node_modules', '@nativescript/core', 'platforms/ios/Podfile');
        if (existsSync(podFilePath)) {
            unlinkSync(podFilePath);
        }
        const iosFile = join(projectFilePath, 'node_modules', '@nativescript/core', 'ui/tabs/index.ios.js');
        if (existsSync(iosFile)) {
            const data = readFileSync(iosFile, 'utf8');
            if (data.indexOf('MDCTabBarView') === -1) {
                const result = data.replace(/MDCTabBar/g, 'MDCTabBarView').replace(/MDCTabBarItemState/g, 'UIControlState');
                writeFileSync(iosFile, result);
            }
        }
        const uiFile = join(projectFilePath, 'node_modules', '@nativescript/core', 'ui/index.js');
        if (existsSync(uiFile)) {
            const data = readFileSync(uiFile, 'utf8');
            const result = data.replace(/^export \{ Tabs \} from '.\/tabs';/gm, '// export { Tabs } from \'./tabs\';');
            writeFileSync(uiFile, result);
        }
    }
};
