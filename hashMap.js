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
    let curSize = buckets.filter((el) => el !== null).length;

    if (curSize >= Math.floor(capacity * loadFactor)) {
      capacity *= 2;
      let newArr = new Array(capacity).fill(null);

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
      }
      
      list.append(pair);
    }
    
    checkCapacity();
  }

  function get(key) {
    const _hash = hash(key);
    const list = buckets[_hash];

    if (list) {
      console.log(list.toString());
      if(!list.contains(key)) return null;

      const index = list.find(key);
      return list.at(index);
    }

    return null;
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
myHash.set('Third', 'Third');
myHash.set('Fourth', 'Fourth');
myHash.set('Fifth', 'Fifth');
console.log('Buckets length: ', myHash.buckets.length);
console.log('Get Anderson: ', myHash.get('Anderson'));
console.log('Get Hello: ', myHash.get('Hello'));
console.log('Get Third: ', myHash.get('Third'));
console.log('Get Fifth: ', myHash.get('Fifth'));
