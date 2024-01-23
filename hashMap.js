const linkedList = require('./linkedList.js');

function hashMap(initialCapacity = 16, givenLoadFactor = .75) {
  const loadFactor = givenLoadFactor;
  let capacity = initialCapacity > 0 ? initialCapacity : 1;
  let buckets = new Array(capacity).fill(null);
  let _length = 0;

  function hash(string) {
    let hash = 0;

    const primeNum = 31;
    [...string].forEach((letter, idx) => {
      hash += primeNum * letter.charCodeAt(0) * (idx + 1);
    })

    return hash % capacity;
  }

  function checkCapacity() {
    let curSize = buckets.filter((el) => el !== null).length;

    if (curSize >= Math.floor(capacity * loadFactor)) {
      capacity *= 2;
      let newArr = new Array(capacity).fill(null);
      _length = 0;

      for (let i = 0; i < buckets.length; i++) {
        if(buckets[i] === null) continue;

        let curr = buckets[i].head;

        while (curr !== null) {
          const [k, val] = curr.data;
          const _hash = hash(k);

          if (newArr[_hash] === null) {
            let newList = linkedList();
            newList.append(curr.data);
            newArr[_hash] = newList;
          } else {
            newArr[_hash].append(curr.data);
          }

          _length += 1;
          curr = curr.next;
        }       
      }

      buckets = newArr;
    }
  }

  function set(key, value) {
    const _hash = hash(key);
    const pair = [key, value];
    let list = buckets[_hash];
    
    if (list === null) {
      let newList = linkedList();
      newList.append(pair);
      buckets[_hash] = newList;
    } else {
      if (list.contains(key)) {
        const index = list.find(key);
        list.removeAt(index);
        _length -= 1;
      }
      
      list.append(pair);
    }
    
    _length += 1;
    checkCapacity();
  }

  function get(key) {
    const _hash = hash(key);
    const list = buckets[_hash];

    if (list) {
      if(!list.contains(key)) return null;

      const index = list.find(key);
      const [, val] = list.at(index); 
      return val;
    }

    return null;
  }

  function has(key) {
    const _hash = hash(key);
    const list = buckets[_hash];

    return list !== null ? list.contains(key) : false;
  }

  function remove(key) {
    const _hash = hash(key);
    const list = buckets[_hash];

    if (list) {
      if (list.contains(key)) {
        const idx = list.find(key);
        list.removeAt(idx);
        _length -= 1;
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  function clear() {
    capacity = initialCapacity;
    _length = 0;
    const newBuckets = new Array(capacity).fill(null);

    buckets = newBuckets;
  }

  function keys() {
    let result = [];
    const lists = buckets.filter((el) => el !== null);

    lists.forEach((list) => {
      for (let i = 0; i < list.size; i++) {
        const [key] = list.at(i);
        result.push(key); 
      }
    });

    return result;
  }

  function values() {
    let result = [];
    const lists = buckets.filter((el) => el !== null);

    lists.forEach((list) => {
      for (let i = 0; i < list.size; i++) {
        const [, value] = list.at(i);
        result.push(value); 
      }
    });

    return result;
  }

  function entries() {
    let result = [];
    const lists = buckets.filter((el) => el !== null);

    lists.forEach((list) => {
      for (let i = 0; i < list.size; i++) {
        const data = list.at(i);
        result.push(data); 
      }
    });

    return result;
  }

  return {
    get buckets() { return buckets; },
    get length() { return _length; },
    set,
    get,
    has,
    remove,
    clear,
    keys,
    values,
    entries,
  }
}
