import assert from "node:assert/strict";
import { test } from "node:test";
import MaxHeap from "../MaxHeapAdhoc.js";

test("should create an empty max heap", () => {
  const maxHeap = new MaxHeap();

  assert.ok(maxHeap);
  assert.strictEqual(maxHeap.peek(), undefined);
  assert.strictEqual(maxHeap.isEmpty(), true);
});

test("should add items to the heap and heapify it up", () => {
  const maxHeap = new MaxHeap();

  maxHeap.add(5);
  assert.strictEqual(maxHeap.isEmpty(), false);
  assert.strictEqual(maxHeap.peek(), 5);
  assert.strictEqual(maxHeap.toString(), "5");

  maxHeap.add(3);
  assert.strictEqual(maxHeap.peek(), 5);
  assert.strictEqual(maxHeap.toString(), "5,3");

  maxHeap.add(10);
  assert.strictEqual(maxHeap.peek(), 10);
  assert.strictEqual(maxHeap.toString(), "10,3,5");

  maxHeap.add(1);
  assert.strictEqual(maxHeap.peek(), 10);
  assert.strictEqual(maxHeap.toString(), "10,3,5,1");

  maxHeap.add(1);
  assert.strictEqual(maxHeap.peek(), 10);
  assert.strictEqual(maxHeap.toString(), "10,3,5,1,1");

  assert.strictEqual(maxHeap.poll(), 10);
  assert.strictEqual(maxHeap.toString(), "5,3,1,1");

  assert.strictEqual(maxHeap.poll(), 5);
  assert.strictEqual(maxHeap.toString(), "3,1,1");

  assert.strictEqual(maxHeap.poll(), 3);
  assert.strictEqual(maxHeap.toString(), "1,1");
});

test("should poll items from the heap and heapify it down", () => {
  const maxHeap = new MaxHeap();

  maxHeap.add(5);
  maxHeap.add(3);
  maxHeap.add(10);
  maxHeap.add(11);
  maxHeap.add(1);

  assert.strictEqual(maxHeap.toString(), "11,10,5,3,1");

  assert.strictEqual(maxHeap.poll(), 11);
  assert.strictEqual(maxHeap.toString(), "10,3,5,1");

  assert.strictEqual(maxHeap.poll(), 10);
  assert.strictEqual(maxHeap.toString(), "5,3,1");

  assert.strictEqual(maxHeap.poll(), 5);
  assert.strictEqual(maxHeap.toString(), "3,1");

  assert.strictEqual(maxHeap.poll(), 3);
  assert.strictEqual(maxHeap.toString(), "1");

  assert.strictEqual(maxHeap.poll(), 1);
  assert.strictEqual(maxHeap.toString(), "");

  assert.strictEqual(maxHeap.poll(), undefined);
  assert.strictEqual(maxHeap.toString(), "");
});

test("should heapify down through the right branch as well", () => {
  const maxHeap = new MaxHeap();

  maxHeap.add(3);
  maxHeap.add(12);
  maxHeap.add(10);

  assert.strictEqual(maxHeap.toString(), "12,3,10");

  maxHeap.add(11);
  assert.strictEqual(maxHeap.toString(), "12,11,10,3");

  assert.strictEqual(maxHeap.poll(), 12);
  assert.strictEqual(maxHeap.toString(), "11,3,10");
});
