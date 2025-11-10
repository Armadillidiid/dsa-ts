// Priority Queue Data Structure Implementation

import { Heap } from "../heap/heap.ts";

export class PriorityQueue<T> {
  // TODO: Add properties here

  constructor(
    initialItems: T[] = [],
    compare: (a: T, b: T) => boolean = (a, b) => a <= b
  ) {
    // TODO: Initialize the heap
  }

  /**
   * Add an item to the priority queue
   * Time Complexity: O(log n)
   */
  enqueue(item: T): void {
    // TODO: Implement enqueue
  }

  /**
   * Remove and return the highest priority item
   * Time Complexity: O(log n)
   */
  dequeue(): T | undefined {
    // TODO: Implement dequeue
  }

  /**
   * View the highest priority item without removing it
   * Time Complexity: O(1)
   */
  peek(): T | undefined {
    // TODO: Implement peek
  }

  /**
   * Check if the priority queue is empty
   * Time Complexity: O(1)
   */
  isEmpty(): boolean {
    // TODO: Implement isEmpty
  }

  /**
   * Get the size of the priority queue
   * Time Complexity: O(1)
   */
  size(): number {
    // TODO: Implement size
  }

  /**
   * Convert the priority queue to a string representation
   * Time Complexity: O(n)
   */
  toString(): string {
    // TODO: Implement toString
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
