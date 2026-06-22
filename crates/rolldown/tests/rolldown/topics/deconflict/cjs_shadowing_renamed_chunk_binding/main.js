import { SharedEnum } from './dependency.js';

var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

// This must read the imported dependency binding. The local `sharedValue$1` below reproduces the
// bug when the dependency's chunk-root `sharedValue` is renamed to `sharedValue$1`.
var eventKind = SharedEnum.EventMatch;

// `sharedValue` forces normal deconfliction to rename the dependency binding to `sharedValue$1`.
// `sharedValue$1` then shadows that final chunk-root name inside the `__commonJS` closure unless
// CJS-local deconfliction also tracks final renamed chunk-scope names.
var sharedValue = class {};
var sharedValue$1 = class {};

console.log(eventKind, sharedValue, sharedValue$1, freeModule);
