// Problem 1: Deep Equal
function deepEqual(objA, objB) {
  if (objA === objB) return true;
  if (
    typeof objA !== 'object' || typeof objB !== 'object' ||
    objA === null || objB === null
  ) return false;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!Object.hasOwn(objB, key) || !deepEqual(objA[key], objB[key])) return false;
  }
  return true;
}
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })) // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })) // false
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }))                     // false

// Problem 2: Object Diff
function diffObjects(oldObj, newObj) {
  const result = { added: {}, removed: {}, changed: {} };
  for (const key of Object.keys(newObj)) {
    if (!Object.hasOwn(oldObj, key)) {
      result.added[key] = newObj[key];
    } else if (oldObj[key] !== newObj[key]) {
      result.changed[key] = { from: oldObj[key], to: newObj[key] };
    }
  }
  for (const key of Object.keys(oldObj)) {
    if (!Object.hasOwn(newObj, key)) result.removed[key] = oldObj[key];
  }
  return result;
}
console.log(diffObjects(
  { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
  { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }
))

// Problem 3: Deep Freeze
function deepFreeze(obj) {
  Object.values(obj).forEach((value) => {
    if (typeof value === 'object' && value !== null) deepFreeze(value);
  });
  return Object.freeze(obj);
}
const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false })
config.api.baseUrl = 'https://changed.com'
config.debug = true
console.log(config.api.baseUrl, config.debug) // "https://x.com" false
console.log(Object.isFrozen(config.api))       // true

// Problem 4: Private Counter Factory
function createCounter() {
  let count = 0;
  return {
    increment() { count++; },
    decrement() { count--; },
    get value() { return count; }
  };
}
const counter = createCounter()
counter.increment()
counter.increment()
counter.decrement()
console.log(counter.value) // 1
console.log(counter.count) // undefined

// Problem 5: Schema Validator
function validateSchema(obj, schema) {
  const errors = [];
  for (const [key, type] of Object.entries(schema)) {
    if (!Object.hasOwn(obj, key)) {
      errors.push(`${key}: missing property`);
    } else if (typeof obj[key] !== type) {
      errors.push(`${key}: expected ${type}, got ${typeof obj[key]}`);
    }
  }
  return errors;
}
const schema = { name: 'string', age: 'number', isAdmin: 'boolean' }
console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema)) // []
console.log(validateSchema({ name: 'Ada', age: '21' }, schema))
// ['age: expected number, got string', 'isAdmin: missing property']
