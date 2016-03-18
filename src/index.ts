import Extend from './core/api/model-class/extend.ts';

import _Build from './core/api/model-class/_build.ts';
import ExtendClass from './core/api/model-class/extend-class.ts';
import ExtendClassIIFE from './core/api/model-class/extend-class-iife.ts';
import OnExtend from './core/api/model-class/on-extend.ts';

import Init from './core/api/instance/init.ts';
import ReInit from './core/api/instance/re-init.ts';

import OnInit from './core/api/common/on-init.ts';
import Components from './core/api/common/components/components.ts';

import ModelClass from './core/model-class.ts';

// Extend should be inited first
Extend();
_Build();
ExtendClass();
ExtendClassIIFE();
OnExtend();

Init();
ReInit();

OnInit();
Components();

interface MOWindow extends Window {
    mObject: any;
}

declare var window: MOWindow;

window.mObject = ModelClass.$.extend();