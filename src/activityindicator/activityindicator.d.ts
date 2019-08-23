import { ActivityIndicatorBase } from './activityindicator-common';
import { Progress as NSProgress } from 'tns-core-modules/ui/progress';
import { mixin } from 'nativescript-material-core';

export class ActivityIndicator extends mixin(ActivityIndicatorBase, NSProgress) {}
