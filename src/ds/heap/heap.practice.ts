abstract class Heap<T extends unknown> {
  public heap: T[];
  public compare: (a: T, b: T) => boolean;

  public constructor(heap: T[] = [], compare: (a: T, b: T) => boolean) {
    // TODO: Implement constructor
  }

  add(item: T) {
    // TODO: Implement add
  }

  peek(): T | undefined {
    // TODO: Implement peek
  }

  poll(): T | undefined {
    // TODO: Implement poll
  }

  isEmpty(): boolean {
    // TODO: Implement isEmpty
  }

  toString(): string {
    // TODO: Implement toString
  }

  heapifyUp(startIndex: number): void {
    // TODO: Implement heapifyUp
  }

  heapifyDown(startIndex: number): void {
    // TODO: Implement heapifyDown
  }

  getLeftChildIndex(parentIndex: number): number {
    // TODO: Implement getLeftChildIndex
  }

  getRightChildIndex(parentIndex: number): number {
    // TODO: Implement getRightChildIndex
  }

  getParentIndex(childIndex: number): number {
    // TODO: Implement getParentIndex
  }

  hasLeftChild(parentIndex: number): boolean {
    // TODO: Implement hasLeftChild
  }

  hasRightChild(parentIndex: number): boolean {
    // TODO: Implement hasRightChild
  }

  leftChild(parentIndex: number): T {
    // TODO: Implement leftChild
  }

  rightChild(parentIndex: number): T {
    // TODO: Implement rightChild
  }

  swap(aIndex: number, bIndex: number): void {
    // TODO: Implement swap
  }
}

class MinHeap<T> extends Heap<T> {
  constructor(
    heap: T[] = [],
    compare: (a: T, b: T) => boolean = (a, b) => a <= b,
  ) {
    super(heap, compare);
  }
}

class MaxHeap<T> extends Heap<T> {
  constructor(
    heap: T[] = [],
    compare: (a: T, b: T) => boolean = (a, b) => a >= b,
  ) {
    super(heap, compare);
  }
}

export { MinHeap, MaxHeap };
