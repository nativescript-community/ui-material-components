import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

module.exports = function (hookArgs: { projectData /* : IProjectData */; prepareData /* : IPrepareData */ }, $logger) {
    const platform = hookArgs.prepareData.platform;

    if (platform === 'ios') {
        const markingModeFullWarning =
            'Using material components 5.x the N tabs component \n will not be fonctional anymore.\nIf you need it migrate to using @nativescript-community/ui-material-tabs\nor go back the 4.x ';
        $logger.warn(markingModeFullWarning, {
            wrapMessageWithBorders: true,
        });
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
    }
};
