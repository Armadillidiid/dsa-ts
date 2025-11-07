export class LinkedList<T> implements ILinkedList<T> {
  private tail: Node<T> | undefined;
  private head: Node<T> | undefined;
  private length: number;

  constructor() {
    this.length = 0;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  get(index: number): T | undefined {
    if (index < 0 || index > this.length - 1) {
      throw new RangeError("Index out of bound");
    }
    if (!this.head) return undefined;

    let currentNode: Node<T> | undefined = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode?.next;
    }
    return currentNode ? currentNode.value : undefined;
  }

  push(data: T): void {
    const newNode = new Node<T>();
    newNode.value = data;

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  pop(): T | undefined {
    if (!this.head) return undefined;
    if (this.length === 1) {
      this.tail === undefined;
    }

    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }

  append(data: T): void {
    const node = new Node<T>();
    node.value = data;

    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.length++;
  }

  removeTail(): T | undefined {
    if (!this.tail || !this.head) return undefined;

    let currNode = this.head;
    let prevNode: Node<T> | undefined = undefined;
    while (currNode.next) {
      prevNode = currNode;
      currNode = currNode.next;
    }

    this.tail = prevNode;
    this.length--;

    return currNode.value;
  }

  insertAt(index: number, data: T): void {
    if (index < 0 || index > this.length) {
      throw new RangeError("Index out of bound");
    }

    if (index === 0) {
      this.push(data);
    } else if (index === this.length) {
      this.append(data);
    } else {
      let currNode = this.head;
      for (let i = 0; i < index - 1; i++) {
        currNode = currNode?.next;
      }
      if (!currNode?.next) throw new Error();
      const newNode = new Node<T>();
      newNode.value = data;
      newNode.next = currNode.next;
      currNode.next = newNode;
      this.length++;
    }
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index > this.length - 1) {
      throw new RangeError("Index out of bound");
    }

    if (index === this.length - 1) {
      return this.removeTail();
    } else if (index === 0) {
      return this.pop();
    } else {
      let prevNode: Node<T> | undefined = undefined;
      let currNode = this.head;
      for (let i = 0; i < index; i++) {
        prevNode = currNode;
        currNode = currNode?.next;
      }
      if (!prevNode) throw new Error();
      prevNode.next = currNode?.next;
      this.length--;

      return currNode?.value;
    }
  }

  clear(): void {
    this.tail = undefined;
    this.head = undefined;
    this.length = 0;
  }

  toArray(): (T | undefined)[] {
    if (!this.head) return [];

    let currNode: Node<T> | undefined = this.head;
    const arr: (T | undefined)[] = [];

    for (let i = 0; i < this.length; i++) {
      arr.push(currNode?.value);
      currNode = currNode?.next;
    }
    return arr;
  }

  getLength(): number {
    return this.length;
  }
}

class Node<T extends unknown> {
  public value: T | undefined;
  public next: Node<T> | undefined;

  constructor() {
    this.value = undefined;
    this.next = undefined;
  }
}

interface ILinkedList<T> {
  isEmpty(): boolean;
  get(index: number): T | undefined;
  push(data: T): void;
  pop(): T | undefined;
  append(data: T): void;
  removeTail(): T | undefined;
  insertAt(index: number, data: T): void;
  removeAt(index: number): T | undefined;
  clear(): void;
  toArray(): (T | undefined)[];
  getLength(): number;
}
