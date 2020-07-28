import { ActivityIndicatorBase } from './activityindicator-common';
import { Progress as NSProgress } from '@nativescript/core';
import { mixin } from 'packages/core/core';

export class ActivityIndicator extends mixin(ActivityIndicatorBase, NSProgress) {}
