abstract class Heap<T extends unknown> {
  public heap: T[];
  public compare: (a: T, b: T) => boolean;

  public constructor(heap: T[] = [], compare: (a: T, b: T) => boolean) {
    this.heap = [];
    this.compare = compare;
    heap.forEach((item) => this.add(item));
  }

  add(item: T) {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }

  peek(): T | undefined {
    return this.heap.at(0);
  }

  poll(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const firstItem = this.heap[0];
    const lastItem = this.heap.pop();

    if (lastItem !== undefined) {
      this.heap[0] = lastItem;
      this.heapifyDown(0);
    }

    return firstItem;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  toString(): string {
    return this.heap.toString();
  }

  heapifyUp(startIndex: number): void {
    if (this.heap.length === 1) return;

    let index = startIndex;
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.compare(this.heap[parentIndex]!, this.heap[index]!)) break;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapifyDown(startIndex: number): void {
    if (this.heap.length === 1) return;

    let index = startIndex;
    while (this.hasLeftChild(index)) {
      const parentItem = this.heap[index]!;
      let smallerChildIndex = this.getLeftChildIndex(index);

      if (
        this.hasRightChild(index) &&
        this.compare(this.rightChild(index), this.leftChild(index))
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      const smallerChild = this.heap[smallerChildIndex]!;
      if (this.compare(parentItem, smallerChild)) {
        break;
      }
      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }

  hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }

  leftChild(parentIndex: number): T {
    const child = this.heap[this.getLeftChildIndex(parentIndex)];
    if (!child) throw new Error();
    return child;
  }

  rightChild(parentIndex: number): T {
    const child = this.heap[this.getRightChildIndex(parentIndex)];
    if (!child) throw new Error();
    return child;
  }

  swap(aIndex: number, bIndex: number): void {
    const [b, a] = [this.heap[bIndex], this.heap[aIndex]];
    if (!a || !b) throw new Error();
    [this.heap[bIndex], this.heap[aIndex]] = [a, b];
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
