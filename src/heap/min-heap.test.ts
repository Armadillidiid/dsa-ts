import assert from 'node:assert/strict';
import { test } from 'node:test';
import MinHeapAdhoc from '../MinHeapAdhoc.js';

test('should create an empty min heap', () => {
    const minHeap = new MinHeapAdhoc();

  assert.ok(minHeap);
  assert.strictEqual(minHeap.peek(), undefined);
  assert.strictEqual(minHeap.isEmpty(), true);
});

test('should add items to the heap and heapify it up', () => {
    const minHeap = new MinHeapAdhoc();

    minHeap.add(5);
  assert.strictEqual(minHeap.isEmpty(), false);
  assert.strictEqual(minHeap.peek(), 5);
  assert.strictEqual(minHeap.toString(), '5');

    minHeap.add(3);
  assert.strictEqual(minHeap.peek(), 3);
  assert.strictEqual(minHeap.toString(), '3,5');

    minHeap.add(10);
  assert.strictEqual(minHeap.peek(), 3);
  assert.strictEqual(minHeap.toString(), '3,5,10');

    minHeap.add(1);
  assert.strictEqual(minHeap.peek(), 1);
  assert.strictEqual(minHeap.toString(), '1,3,10,5');

    minHeap.add(1);
  assert.strictEqual(minHeap.peek(), 1);
  assert.strictEqual(minHeap.toString(), '1,1,10,5,3');

  assert.strictEqual(minHeap.poll(), 1);
  assert.strictEqual(minHeap.toString(), '1,3,10,5');

  assert.strictEqual(minHeap.poll(), 1);
  assert.strictEqual(minHeap.toString(), '3,5,10');

  assert.strictEqual(minHeap.poll(), 3);
  assert.strictEqual(minHeap.toString(), '5,10');
});

test('should poll items from the heap and heapify it down', () => {
    const minHeap = new MinHeapAdhoc();

    minHeap.add(5);
    minHeap.add(3);
    minHeap.add(10);
    minHeap.add(11);
    minHeap.add(1);

  assert.strictEqual(minHeap.toString(), '1,3,10,11,5');

  assert.strictEqual(minHeap.poll(), 1);
  assert.strictEqual(minHeap.toString(), '3,5,10,11');

  assert.strictEqual(minHeap.poll(), 3);
  assert.strictEqual(minHeap.toString(), '5,11,10');

  assert.strictEqual(minHeap.poll(), 5);
  assert.strictEqual(minHeap.toString(), '10,11');

  assert.strictEqual(minHeap.poll(), 10);
  assert.strictEqual(minHeap.toString(), '11');

  assert.strictEqual(minHeap.poll(), 11);
  assert.strictEqual(minHeap.toString(), '');

  assert.strictEqual(minHeap.poll(), undefined);
  assert.strictEqual(minHeap.toString(), '');
});

test('should heapify down through the right branch as well', () => {
    const minHeap = new MinHeapAdhoc();

    minHeap.add(3);
    minHeap.add(12);
    minHeap.add(10);

  assert.strictEqual(minHeap.toString(), '3,12,10');

    minHeap.add(11);
  assert.strictEqual(minHeap.toString(), '3,11,10,12');

  assert.strictEqual(minHeap.poll(), 3);
  assert.strictEqual(minHeap.toString(), '10,11,12');
});
