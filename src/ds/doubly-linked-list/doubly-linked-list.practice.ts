export class DoublyLinkedList<T> implements ILinkedList<T> {
  private tail: Node<T> | undefined;
  private head: Node<T> | undefined;
  private length: number;

  constructor() {
    this.length = 0;
  }

  isEmpty(): boolean {
    return !this.length;
  }

  get(index: number): T | undefined {
    if (index < 0 || index > this.length - 1) {
      throw new RangeError("Index out of bound");
    }
    if (!this.head) return undefined;

    let currNode: Node<T> | undefined = this.head;
    for (let i = 0; i < index; i++) {
      currNode = currNode?.next;
    }

    return currNode?.value;
  }

  push(data: T): void {
    const node = new Node<T>();
    node.value = data;

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
  }

  pop(): T | undefined {
    if (!this.head) return undefined;
    const markedNode = this.head;
    this.head = this.head.next;
    this.length--;
    return markedNode.value;
  }

  append(data: T): void {
    const node = new Node<T>();
    node.value = data;

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  removeTail(): T | undefined {
    if (!this.tail) {
      return;
    }

    const markedNode = this.tail;
    if (this.length === 1) {
      this.head = undefined;
      this.tail = undefined;
      return;
    } else {
      this.tail = this.tail.prev;
      if (!this.tail?.next) throw new Error();
      this.tail.next = undefined;
    }

    this.length--;
    return markedNode.value;
  }

  insertAt(index: number, data: T): void {
    if (index < 0 && index > this.length - 1) {
      throw new RangeError("Index out of bound");
    }
    if (!this.head) return;

    const node = new Node<T>();
    node.value = data;

    let currNode: Node<T> | undefined = this.head;
    for (let i = 0; i < index; i++) {
      currNode = currNode?.next;
    }
    if (!currNode) throw new Error();
    node.next = currNode;
    node.prev = currNode.prev;
    currNode.prev = node;
    if (node.prev) {
      node.prev.next = node;
    }

    this.length++;
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
      let currNode: Node<T> | undefined = this.head;
      for (let i = 0; i < index; i++) {
        currNode = currNode?.next;
      }
      if (!currNode || !currNode.prev || !currNode.next) {
        throw new Error();
      }
      currNode.prev.next = currNode.next;
      currNode.next.prev = currNode.prev;
      this.length--;
      return currNode.value;
    }
  }

  clear(): void {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  toArray(): (T | undefined)[] {
    if (!this.head) return [];

    const arr: (T | undefined)[] = [];

    let currNode: Node<T> | undefined = this.head;
    for (let i = 0; i < this.length; i++) {
      arr.push(currNode?.value);
      currNode = currNode?.next;
    }

    return arr;
  }

  getLength(): number {
    return this.length;
  }

  reverse(): DoublyLinkedList<T> | undefined {
    if (!this.head) return undefined;

    let prevNode: Node<T> | undefined = this.head.prev;
    let currNode: Node<T> | undefined = this.head;
    let nextNode: Node<T> | undefined = this.head.next;

    for (let i = 0; i < this.length; i++) {
      if (currNode) {
        currNode.next = prevNode;
        currNode.prev = nextNode;
      }
      currNode = currNode?.prev;
      prevNode = currNode?.prev;
      nextNode = currNode?.next;
    }
    const prevHead = this.head;
    this.head = this.tail;
    this.tail = prevHead;

    return this;
  }
}

class Node<T extends unknown> {
  public value: T | undefined;
  public next: Node<T> | undefined;
  public prev: Node<T> | undefined;

  constructor() {}
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
