import { strict as assert } from 'node:assert';

// Regression test for #9882. The entry contains a CommonJS environment probe, so rolldown
// wraps it in `__commonJSMin((exports, module) => { ... })`. Pre-fix, the entry's local
// `var sharedValue` hoisted to the top of that closure and shadowed the dependency's
// chunk-root `sharedValue` binding (assigned inside `__esmMin`), so `SharedEnum.EventMatch`
// read `undefined.EventMatch` and threw:
//   TypeError: Cannot read properties of undefined (reading 'EventMatch')
// `export default require_entry()` runs the closure at module-eval time, so simply importing
// the bundle reproduces the throw. After the fix the two bindings are deconflicted (e.g. the
// dependency's becomes `sharedValue$1`) and the import resolves cleanly.
await import('./dist/main.js');

// Reaching this line means the wrapped entry executed without throwing -> no shadowing.
assert.ok(true);
