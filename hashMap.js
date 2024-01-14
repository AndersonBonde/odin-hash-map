function hashMap(initialCapacity = 16, givenLoadFactor = .75) {
  const loadFactor = givenLoadFactor;
  let capacity = initialCapacity;
  let buckets = new Array(capacity).fill(null);

  function hash(string) {
    let hash = 0;

    const primeNum = 31;
    [...string].forEach((letter, idx) => {
      hash += primeNum * letter.charCodeAt(0) * (idx + 1);
    })

    return hash % capacity;
  }

  function checkCapacity() {
    const curSize = buckets.filter((el) => el).length;

    if (curSize >= Math.floor(capacity * loadFactor)) {
      capacity *= 2;
      const newArr = new Array(capacity).fill(null);

      buckets.forEach((value, idx) => {
        newArr[idx] = value;
      })

      buckets = newArr;
    }
  }

  function set(key, value) {
    const _hash = hash(key);
    const obj = {};
    obj[key] = value;

    buckets[_hash] = obj;
    checkCapacity();
  }

  function get(key) {
    const _hash = hash(key);

    if (buckets[_hash] !== null) {
      const k = Object.keys(buckets[_hash]);

      if (k == key) {
        return buckets[_hash][key];
      } else {
        return null;
      }
    } else {
      return buckets[_hash];
    }
  }

  return {
    get buckets() { return buckets; },
    set,
    get,
  }
}
const myHash = hashMap();
myHash.set('Anderson', 'Nice');
myHash.set('Hi', 'I"m under the water');
console.log(myHash.buckets);

console.log('get("Anderson"):', myHash.get('Anderson'));
console.log('get("anderson"):', myHash.get('anderson'));
console.log('get("Nice"):', myHash.get('Nice'));
console.log('get("Hi"):', myHash.get('Hi'));
console.log('get("hi"):', myHash.get('hi'));