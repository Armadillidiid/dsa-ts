import { describe, it } from "node:test";
import assert from "node:assert";
import { Queue } from "./queue.practice.ts";

describe("Queue", () => {
  it("should create an instance", () => {
    const instance = new Queue();
    assert.ok(instance);
  });

  it("enqueue should add a new element to the queue", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    assert.strictEqual(queue.length(), 1);
  });

  it("isEmpty should return true on empty queue", () => {
    const queue = new Queue<number>();
    assert.strictEqual(queue.isEmpty(), true);
  });

  it("isEmpty should return false on not empty queue", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    assert.strictEqual(queue.isEmpty(), false);
  });

  it("front should return the first value", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    assert.strictEqual(queue.peek(), 1);
  });

  it("front should return null when the queue is empty", () => {
    const queue = new Queue<number>();
    assert.strictEqual(queue.peek(), null);
  });

  it("length should return the number of elements in the queue", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(1);
    queue.enqueue(1);
    assert.strictEqual(queue.length(), 3);
  });

  it("dequeue should remove the first element", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.dequeue();
    assert.strictEqual(queue.length(), 2);
  });

  it("dequeue should return null when queue is empty", () => {
    const queue = new Queue<number>();
    assert.strictEqual(queue.dequeue(), null);
  });
});
