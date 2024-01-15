const node = require('./node.js');

function linkedList() {
  let _head = null;
  let _size = 0;

  const prepend = (value) => {
    _size += 1;
    _head = node(value, _head);
  }

  const append = (value) => {
    if(_head === null) {
      prepend(value); 
      return;
    }

    _size += 1;
    let curr = _head;

    while(curr.next !== null) curr = curr.next;
    curr.next = node(value, null);
  }

  const tail = () => {
    let curr = _head;

    while(curr.next !== null) curr = curr.next;
    return curr;
  }

  const at = (num) => {
    let idx = 0;
    let curr = _head;

    while(idx < num) {
      curr = curr.next;
      idx += 1;
    }

    return curr !== null ? Object.values(curr.data)[0] : 'Not a valid index';
  }

  const pop = () => {
    let curr = _head;
    let prev = undefined;

    if(_head !== null) _size -= 1;

    while(curr.next !== null) {
      prev = curr;
      curr = curr.next;
    }

    prev.next = null;
    return curr;
  }

  const contains = (key) => {
    let curr = _head;

    while(curr !== null) {
      if(Object.keys(curr.data)[0] == key) return true;
      curr = curr.next;
    }

    return false;
  }

  const find = (key) => {
    let curr = _head;
    let idx = 0;

    while(curr.next !== null) {
      if(Object.keys(curr.data)[0] == key) return idx;

      curr = curr.next;
      idx += 1;
    }

    return null;
  }

  const toString = () => {
    let curr = _head;
    let str = '';

    if(_head === null) return str += 'null';

    while(curr.next !== null) {
      str += ` ( ${curr.data} ) ->`;

      curr = curr.next;
    }
    str += ` ( ${curr.data} ) ->`;
    str += ` null'`;

    return str;
  }

  const insertAt = (value, index) => {
    let prev = undefined;
    let curr = _head;
    let i = 0;

    if(index === 0) {
      prepend(value);
    } else {
      if(index > _size) return console.error('Invalid index for insertion.');

      while(index !== i) {
        prev = curr;
        curr = curr.next;
        i += 1;
      }

      prev.next = node(value, curr);
      _size += 1;
    }
  }

  const removeAt = (index) => {
    let prev = undefined;
    let curr = _head;
    let i = 0;

    if(index >= _size) return console.error('Invalid index for deletion');

    while(i < index) {
      prev = curr;
      curr = curr.next;
      i += 1;
    }

    prev.next = curr.next;
    _size -= 1;
  }

  return {
    get head() { return _head; },
    get size() { return _size },
    get tail() { return tail() },
    prepend,
    append,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt
  }
}

module.exports = linkedList;
