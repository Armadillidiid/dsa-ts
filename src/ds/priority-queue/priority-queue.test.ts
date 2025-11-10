import assert from "node:assert/strict";
import { test, describe } from "node:test";
import {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue,
} from "./priority-queue.ts";

describe("MinPriorityQueue", () => {
  test("should create an empty min priority queue", () => {
    const pq = new MinPriorityQueue<number>();

    assert.ok(pq);
    assert.strictEqual(pq.peek(), undefined);
    assert.strictEqual(pq.isEmpty(), true);
    assert.strictEqual(pq.size(), 0);
  });

  test("should enqueue items and maintain min priority order", () => {
    const pq = new MinPriorityQueue<number>();

    pq.enqueue(5);
    assert.strictEqual(pq.isEmpty(), false);
    assert.strictEqual(pq.peek(), 5);
    assert.strictEqual(pq.size(), 1);

    pq.enqueue(3);
    assert.strictEqual(pq.peek(), 3);
    assert.strictEqual(pq.size(), 2);

    pq.enqueue(10);
    assert.strictEqual(pq.peek(), 3);
    assert.strictEqual(pq.size(), 3);

    pq.enqueue(1);
    assert.strictEqual(pq.peek(), 1);
    assert.strictEqual(pq.size(), 4);
  });

  test("should dequeue items in min priority order", () => {
    const pq = new MinPriorityQueue<number>();

    pq.enqueue(5);
    pq.enqueue(3);
    pq.enqueue(10);
    pq.enqueue(1);
    pq.enqueue(7);

    assert.strictEqual(pq.dequeue(), 1);
    assert.strictEqual(pq.dequeue(), 3);
    assert.strictEqual(pq.dequeue(), 5);
    assert.strictEqual(pq.dequeue(), 7);
    assert.strictEqual(pq.dequeue(), 10);
    assert.strictEqual(pq.dequeue(), undefined);
    assert.strictEqual(pq.isEmpty(), true);
  });

  test("should work with custom comparison function", () => {
    interface Task {
      name: string;
      priority: number;
    }

    const pq = new MinPriorityQueue<Task>(
      [],
      (a, b) => a.priority <= b.priority
    );

    pq.enqueue({ name: "Low priority", priority: 5 });
    pq.enqueue({ name: "High priority", priority: 1 });
    pq.enqueue({ name: "Medium priority", priority: 3 });

    const first = pq.dequeue();
    assert.strictEqual(first?.name, "High priority");
    assert.strictEqual(first?.priority, 1);

    const second = pq.dequeue();
    assert.strictEqual(second?.name, "Medium priority");
    assert.strictEqual(second?.priority, 3);

    const third = pq.dequeue();
    assert.strictEqual(third?.name, "Low priority");
    assert.strictEqual(third?.priority, 5);
  });

  test("should initialize with an array of items", () => {
    const pq = new MinPriorityQueue<number>([5, 3, 10, 1, 7]);

    assert.strictEqual(pq.size(), 5);
    assert.strictEqual(pq.peek(), 1);
    assert.strictEqual(pq.dequeue(), 1);
    assert.strictEqual(pq.dequeue(), 3);
    assert.strictEqual(pq.dequeue(), 5);
  });
});

describe("MaxPriorityQueue", () => {
  test("should create an empty max priority queue", () => {
    const pq = new MaxPriorityQueue<number>();

    assert.ok(pq);
    assert.strictEqual(pq.peek(), undefined);
    assert.strictEqual(pq.isEmpty(), true);
    assert.strictEqual(pq.size(), 0);
  });

  test("should enqueue items and maintain max priority order", () => {
    const pq = new MaxPriorityQueue<number>();

    pq.enqueue(5);
    assert.strictEqual(pq.isEmpty(), false);
    assert.strictEqual(pq.peek(), 5);
    assert.strictEqual(pq.size(), 1);

    pq.enqueue(3);
    assert.strictEqual(pq.peek(), 5);
    assert.strictEqual(pq.size(), 2);

    pq.enqueue(10);
    assert.strictEqual(pq.peek(), 10);
    assert.strictEqual(pq.size(), 3);

    pq.enqueue(1);
    assert.strictEqual(pq.peek(), 10);
    assert.strictEqual(pq.size(), 4);
  });

  test("should dequeue items in max priority order", () => {
    const pq = new MaxPriorityQueue<number>();

    pq.enqueue(5);
    pq.enqueue(3);
    pq.enqueue(10);
    pq.enqueue(1);
    pq.enqueue(7);

    assert.strictEqual(pq.dequeue(), 10);
    assert.strictEqual(pq.dequeue(), 7);
    assert.strictEqual(pq.dequeue(), 5);
    assert.strictEqual(pq.dequeue(), 3);
    assert.strictEqual(pq.dequeue(), 1);
    assert.strictEqual(pq.dequeue(), undefined);
    assert.strictEqual(pq.isEmpty(), true);
  });

  test("should work with custom comparison function", () => {
    interface Task {
      name: string;
      priority: number;
    }

    const pq = new MaxPriorityQueue<Task>(
      [],
      (a, b) => a.priority >= b.priority
    );

    pq.enqueue({ name: "Low priority", priority: 1 });
    pq.enqueue({ name: "High priority", priority: 5 });
    pq.enqueue({ name: "Medium priority", priority: 3 });

    const first = pq.dequeue();
    assert.strictEqual(first?.name, "High priority");
    assert.strictEqual(first?.priority, 5);

    const second = pq.dequeue();
    assert.strictEqual(second?.name, "Medium priority");
    assert.strictEqual(second?.priority, 3);

    const third = pq.dequeue();
    assert.strictEqual(third?.name, "Low priority");
    assert.strictEqual(third?.priority, 1);
  });

  test("should initialize with an array of items", () => {
    const pq = new MaxPriorityQueue<number>([5, 3, 10, 1, 7]);

    assert.strictEqual(pq.size(), 5);
    assert.strictEqual(pq.peek(), 10);
    assert.strictEqual(pq.dequeue(), 10);
    assert.strictEqual(pq.dequeue(), 7);
    assert.strictEqual(pq.dequeue(), 5);
  });
});

describe("PriorityQueue (generic)", () => {
  test("should create min priority queue by default", () => {
    const pq = new PriorityQueue<number>();

    pq.enqueue(5);
    pq.enqueue(3);
    pq.enqueue(10);

    assert.strictEqual(pq.dequeue(), 3);
  });

  test("should create max priority queue with custom comparator", () => {
    const pq = new PriorityQueue<number>([], (a, b) => a >= b);

    pq.enqueue(5);
    pq.enqueue(3);
    pq.enqueue(10);

    assert.strictEqual(pq.dequeue(), 10);
  });

  test("should handle duplicate priorities", () => {
    const pq = new MinPriorityQueue<number>();

    pq.enqueue(5);
    pq.enqueue(5);
    pq.enqueue(5);
    pq.enqueue(3);

    assert.strictEqual(pq.dequeue(), 3);
    assert.strictEqual(pq.dequeue(), 5);
    assert.strictEqual(pq.dequeue(), 5);
    assert.strictEqual(pq.dequeue(), 5);
  });
});
