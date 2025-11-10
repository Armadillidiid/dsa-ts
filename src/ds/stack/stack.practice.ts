export class Stack<T = unknown> implements IStack<T> {
  public top: Node<T> | undefined;
  public size: number;

  constructor() {
    this.size = 0;
  }

  push(element: T): void {
    const node = new Node(element);
    node.next = this.top;
    this.top = node;
    this.size++;
  }
  pop(): T | null {
    if (this.isEmpty()) return null;

    const old = this.top;
    this.top = this.top?.next;
    this.size--;
    return old?.value ?? null;
  }

  peek(): T | null {
    if (this.isEmpty()) return null;
    return this.top?.value ?? null;
  }

  length(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}

class Node<T> {
  public value: T | undefined;
  public next: Node<T> | undefined;

  constructor(value: T) {
    this.value = value;
  }
}

interface IStack<T> {
  push(element: T): void;
  pop(): T | null;
  peek(): T | null;
  isEmpty(): boolean;
  length(): number;
}
