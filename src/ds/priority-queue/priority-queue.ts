// Priority Queue Data Structure Implementation

import { Heap } from "../heap/heap.ts";

export class PriorityQueue<T> {
  private heap: Heap<T>;

  constructor(
    initialItems: T[] = [],
    compare: (a: T, b: T) => boolean = (a, b) => a <= b
  ) {
    this.heap = new Heap<T>(initialItems, compare);
  }

  /**
   * Add an item to the priority queue
   * Time Complexity: O(log n)
   */
  enqueue(item: T): void {
    this.heap.add(item);
  }

  /**
   * Remove and return the highest priority item
   * Time Complexity: O(log n)
   */
  dequeue(): T | undefined {
    return this.heap.poll();
  }

  /**
   * View the highest priority item without removing it
   * Time Complexity: O(1)
   */
  peek(): T | undefined {
    return this.heap.peek();
  }

  /**
   * Check if the priority queue is empty
   * Time Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.heap.isEmpty();
  }

  /**
   * Get the size of the priority queue
   * Time Complexity: O(1)
   */
  size(): number {
    return this.heap.heap.length;
  }

  /**
   * Convert the priority queue to a string representation
   * Time Complexity: O(n)
   */
  toString(): string {
    return this.heap.toString();
  }
}

export class MinPriorityQueue<T> extends PriorityQueue<T> {
  constructor(
    initialItems: T[] = [],
    compare: (a: T, b: T) => boolean = (a, b) => a <= b
  ) {
    super(initialItems, compare);
  }
}

export class MaxPriorityQueue<T> extends PriorityQueue<T> {
  constructor(
    initialItems: T[] = [],
    compare: (a: T, b: T) => boolean = (a, b) => a >= b
  ) {
    super(initialItems, compare);
  }
}
