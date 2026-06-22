// Repro for #9882. Two ingredients force the bug:
//   1. A CommonJS environment probe (references to `exports` / `module`) makes rolldown wrap
//      this entry in its `__commonJSMin((exports, module) => { ... })` runtime helper.
//   2. A local `var sharedValue` whose name collides with the canonical name of the binding
//      imported from `./dependency.js` (its local is `sharedValue`, re-exported as `SharedEnum`).
import { SharedEnum } from './dependency.js';

var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

// Reads the imported binding *before* the local `var sharedValue` below is initialized.
var eventKind = SharedEnum.EventMatch;

// Author-local `var`. Pre-fix it hoists to the top of the wrapper closure and shadows the
// captured chunk-root `sharedValue`, so the `SharedEnum.EventMatch` read above resolves to
// the inner `undefined` local -> `TypeError: Cannot read properties of undefined`.
var sharedValue = class {};

console.log(eventKind, sharedValue, freeModule);
