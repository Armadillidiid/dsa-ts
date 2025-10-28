class MaxHeap {
  heap: number[];

  constructor(heap: number[] = []) {}

  add(num: number) {}

  peek(): number | undefined {}

  poll(): number | undefined {}

  isEmpty(): boolean {}

  toString(): string {}

  heapifyUp(): void {}

  heapifyDown(): void {}

  getLeftChildIndex(parentIndex: number): number {}

  getRightChildIndex(parentIndex: number): number {}

  getParentIndex(childIndex: number): number {}

  hasLeftChild(parentIndex: number): boolean {}

  hasRightChild(parentIndex: number): boolean {}

  leftChild(parentIndex: number): number {}

  rightChild(parentIndex: number): number {}

  swap(indexOne: number, indexTwo: number): void {}
}

export default MaxHeap;
