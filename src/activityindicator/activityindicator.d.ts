import { ActivityIndicatorBase } from './activityindicator-common';
import { Progress as NSProgress } from '@nativescript/core/ui/progress';
import { mixin } from 'nativescript-material-core';

export class ActivityIndicator extends mixin(ActivityIndicatorBase, NSProgress) {}
