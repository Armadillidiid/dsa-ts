import { beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import { HashTable, MapEntry } from "./hash-table.practice.ts";

describe("HashTable", () => {
  let hashMap: HashTable<string, number>;
  beforeEach(() => {
    hashMap = new HashTable();
  });

  it("should set a value", () => {
    hashMap.set("a", 1);

    assert.deepStrictEqual(hashMap.values(), [1]);
  });

  it("should override a value", () => {
    hashMap.set("a", 1);
    hashMap.set("a", 2);

    assert.deepStrictEqual(hashMap.values(), [2]);
  });

  it("should get a value", () => {
    hashMap.set("a", 1);

    assert.strictEqual(hashMap.get("a"), 1);
  });

  it("should get null if key does not exist", () => {
    assert.strictEqual(hashMap.get("a"), null);
  });

  it("should delete a value", () => {
    hashMap.set("a", 1);
    hashMap.delete("a");

    assert.strictEqual(hashMap.get("a"), null);
  });

  it("should do nothing on delete if key does not exist", () => {
    hashMap.delete("a");

    assert.strictEqual(hashMap.get("a"), null);
  });

  it("should return true if key exists", () => {
    hashMap.set("a", 1);

    assert.strictEqual(hashMap.has("a"), true);
  });

  it("should return false if key does not exist", () => {
    assert.strictEqual(hashMap.has("a"), false);
  });

  it("should clear the hash table", () => {
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.set("c", 3);
    hashMap.clear();

    assert.strictEqual(hashMap.getSize(), 0);
  });

  it("should return all keys", () => {
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.set("c", 3);

    assert.deepStrictEqual(hashMap.keys(), ["a", "b", "c"]);
  });

  it("should return all values", () => {
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.set("c", 3);

    assert.deepStrictEqual(hashMap.values(), [1, 2, 3]);
  });

  it("should return all key-value pairs", () => {
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.set("c", 3);

    assert.deepStrictEqual(hashMap.entries(), [
      new MapEntry("a", 1),
      new MapEntry("b", 2),
      new MapEntry("c", 3),
    ]);
  });

  it("should keep entries when trigger resize", () => {
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.set("c", 3);
    hashMap.set("d", 4);
    hashMap.set("e", 5);
    hashMap.set("f", 6);
    hashMap.set("g", 7);
    hashMap.set("h", 8);
    hashMap.set("i", 9);
    hashMap.set("j", 10);
    hashMap.set("k", 11);
    hashMap.set("l", 12);
    hashMap.set("m", 13);
    hashMap.set("n", 14);
    assert.strictEqual(hashMap.getSize(), 14);
  });

  it("should resize when load factor is exceeded", () => {
    const initialCapacity = hashMap.getCapacity();
    assert.strictEqual(initialCapacity, 16);

    // Add 13 items (13/16 = 0.8125 > 0.75 load factor)
    for (let i = 0; i < 13; i++) {
      hashMap.set(String.fromCharCode(97 + i), i); // a-m
    }

    const newCapacity = hashMap.getCapacity();
    assert.strictEqual(newCapacity, 32); // Should have doubled
  });

  it("should maintain all values after resize", () => {
    // Add enough items to trigger multiple resizes
    const entries: [string, number][] = [];
    for (let i = 0; i < 30; i++) {
      const key = `key${i}`;
      entries.push([key, i]);
      hashMap.set(key, i);
    }

    // Verify all values are still accessible
    for (const [key, value] of entries) {
      assert.strictEqual(hashMap.get(key), value);
    }

    assert.strictEqual(hashMap.getSize(), 30);
  });

  it("should resize multiple times as needed", () => {
    const initialCapacity = hashMap.getCapacity();
    assert.strictEqual(initialCapacity, 16);

    // Add 50 items to trigger multiple resizes
    // 16 -> 32 (at 13th item, 13/16 > 0.75)
    // 32 -> 64 (at 25th item, 25/32 > 0.75)
    // 64 -> 128 (at 49th item, 49/64 > 0.75)
    for (let i = 0; i < 50; i++) {
      hashMap.set(`item${i}`, i);
    }

    const finalCapacity = hashMap.getCapacity();
    assert.strictEqual(finalCapacity, 128);
    assert.strictEqual(hashMap.getSize(), 50);
  });

  it("should handle collision chains after resize", () => {
    // These keys will create collisions with capacity 16
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.set("c", 3);

    // Add more to trigger resize
    for (let i = 0; i < 13; i++) {
      hashMap.set(`key${i}`, i + 10);
    }

    // Original keys should still be accessible
    assert.strictEqual(hashMap.get("a"), 1);
    assert.strictEqual(hashMap.get("b"), 2);
    assert.strictEqual(hashMap.get("c"), 3);
  });

  it("should update values correctly after resize", () => {
    // Add items to trigger resize
    for (let i = 0; i < 15; i++) {
      hashMap.set(`key${i}`, i);
    }

    // Update values after resize
    hashMap.set("key0", 100);
    hashMap.set("key5", 200);
    hashMap.set("key14", 300);

    assert.strictEqual(hashMap.get("key0"), 100);
    assert.strictEqual(hashMap.get("key5"), 200);
    assert.strictEqual(hashMap.get("key14"), 300);
    assert.strictEqual(hashMap.getSize(), 15); // Size shouldn't change
  });
});
