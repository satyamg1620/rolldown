// ESM dependency. Two things matter:
//   1. It is imported by the CommonJS-wrapped entry, so rolldown wraps it with `__esmMin` and
//      hoists its top-level `sharedValue` binding to chunk-root scope (`var sharedValue;`).
//   2. The self-referential, side-effectful initializer keeps that binding from being
//      tree-shaken, so it survives at chunk root as the binding the entry's local shadows.
var sharedValue = ((value) => {
  value.EventMatch = 'event_match';
  return value;
})(sharedValue || {});

export { sharedValue as SharedEnum };
