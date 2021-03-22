/**
 * Material ActivityIndicator component
 * @module @nativescript-community/ui-material-activityindicator
 */

import { ActivityIndicatorBase } from './index-common';
import { Progress as NSProgress } from '@nativescript/core';
import { mixin } from '@nativescript-community/ui-material-core';

export class ActivityIndicator extends mixin(ActivityIndicatorBase, NSProgress) {}
