export class Queue<T = unknown> implements IQueue<T> {
  // TODO: Implement your solution
  public head?: Node<T> | undefined;
  public tail: Node<T> | undefined;
  public size: number;

  constructor() {
    this.size = 0;
  }

  enqueue(element: T): void {
    const node = new Node(element);

    if (!this.tail) {
      this.head = this.head = node;
    } else {
      this.tail.next = node;
    }

    this.size++;
  }

  dequeue(): T | null {
    if (!this.head) return null;

    const old = this.head;
    this.head = this.head.next;
    this.size--;
    return old.value ?? null;
  }

  peek(): T | null {
    if (this.isEmpty()) return null;
    return this.head?.value ?? null;
  }

  isEmpty(): boolean {
    return !this.size;
  }

  length(): number {
    return this.size;
  }
}

class Node<T> {
  public value: T | undefined;
  public next: Node<T> | undefined;

  constructor(value?: T) {
    this.value = value;
  }
}

interface IQueue<T> {
  enqueue(element: T): void;
  dequeue(): T | null;
  peek(): T | null;
  isEmpty(): boolean;
  length(): number;
}
