const linkedList = require('./linkedList.js');

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
    let list = buckets[_hash];

    if (list === null) {
      list = linkedList();
      list.append(obj);
      buckets[_hash] = list;
    } else {
      if (list.contains(key)) {
        const index = list.find(key);
        list.removeAt(index);
      } 

      list.append(obj);
    }
    
    checkCapacity();
  }

  function get(key) {
    const _hash = hash(key);
    const list = buckets[_hash];

    if (list) {
      if(!list.contains(key)) return null;

      const index = list.find(key);
      return list.at(index);
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
myHash.set('Hello', 'I"m under the water');
console.log(myHash.get('Anderson'));
