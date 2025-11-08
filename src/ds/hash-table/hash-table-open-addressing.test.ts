import { beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import { HashTableOpenAddressing } from "./hash-table-open-addressing.ts";

describe("HashTableOpenAddressing", () => {
  let hashMap: HashTableOpenAddressing<string, number>;
  beforeEach(() => {
    hashMap = new HashTableOpenAddressing();
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

    assert.deepStrictEqual(hashMap.keys().sort(), ["a", "b", "c"]);
  });

  it("should return all values", () => {
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.set("c", 3);

    assert.deepStrictEqual(hashMap.values().sort(), [1, 2, 3]);
  });

  it("should return all key-value pairs", () => {
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.set("c", 3);

    const entries = hashMap.entries();
    assert.strictEqual(entries.length, 3);
    assert.ok(entries.find((e) => e.key === "a" && e.value === 1));
    assert.ok(entries.find((e) => e.key === "b" && e.value === 2));
    assert.ok(entries.find((e) => e.key === "c" && e.value === 3));
  });

  it("should handle linear probing on collision", () => {
    // Fill the table to create collisions
    for (let i = 0; i < 8; i++) {
      hashMap.set(`key${i}`, i);
    }

    // All keys should still be accessible
    for (let i = 0; i < 8; i++) {
      assert.strictEqual(hashMap.get(`key${i}`), i);
    }
  });

  it("should resize when load factor is exceeded", () => {
    const initialCapacity = hashMap.getCapacity();
    assert.strictEqual(initialCapacity, 16);

    // Add 9 items (9/16 = 0.5625 > 0.5 load factor)
    for (let i = 0; i < 9; i++) {
      hashMap.set(`key${i}`, i);
    }

    const newCapacity = hashMap.getCapacity();
    assert.strictEqual(newCapacity, 32);
  });

  it("should maintain all values after resize", () => {
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

  it("should handle deletion with linear probing", () => {
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.set("c", 3);

    hashMap.delete("b");

    assert.strictEqual(hashMap.get("a"), 1);
    assert.strictEqual(hashMap.get("b"), null);
    assert.strictEqual(hashMap.get("c"), 3);
    assert.strictEqual(hashMap.getSize(), 2);
  });

  it("should reuse deleted slots on insertion", () => {
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.delete("a");

    // Adding new item should reuse the deleted slot
    hashMap.set("c", 3);

    assert.strictEqual(hashMap.get("c"), 3);
    assert.strictEqual(hashMap.getSize(), 2);
  });

  it("should handle multiple deletions and insertions", () => {
    for (let i = 0; i < 10; i++) {
      hashMap.set(`key${i}`, i);
    }

    // Delete some items
    hashMap.delete("key2");
    hashMap.delete("key5");
    hashMap.delete("key7");

    assert.strictEqual(hashMap.getSize(), 7);

    // Add new items
    hashMap.set("new1", 100);
    hashMap.set("new2", 200);

    assert.strictEqual(hashMap.getSize(), 9);
    assert.strictEqual(hashMap.get("new1"), 100);
    assert.strictEqual(hashMap.get("new2"), 200);
    assert.strictEqual(hashMap.get("key2"), null);
  });

  it("should update values correctly after resize", () => {
    for (let i = 0; i < 15; i++) {
      hashMap.set(`key${i}`, i);
    }

    hashMap.set("key0", 100);
    hashMap.set("key5", 200);
    hashMap.set("key14", 300);

    assert.strictEqual(hashMap.get("key0"), 100);
    assert.strictEqual(hashMap.get("key5"), 200);
    assert.strictEqual(hashMap.get("key14"), 300);
    assert.strictEqual(hashMap.getSize(), 15);
  });

  it("should iterate over all entries", () => {
    hashMap.set("a", 1);
    hashMap.set("b", 2);
    hashMap.set("c", 3);

    const entries = Array.from(hashMap);
    assert.strictEqual(entries.length, 3);

    const keys = entries.map(([k]) => k).sort();
    const values = entries.map(([, v]) => v).sort();

    assert.deepStrictEqual(keys, ["a", "b", "c"]);
    assert.deepStrictEqual(values, [1, 2, 3]);
  });

  it("should handle probe sequence correctly after deletion", () => {
    // Create a specific collision scenario
    hashMap.set("key1", 1);
    hashMap.set("key2", 2);
    hashMap.set("key3", 3);

    // Delete middle key
    hashMap.delete("key2");

    // Should still find key3 (probe sequence maintained by DELETED marker)
    assert.strictEqual(hashMap.get("key3"), 3);
    assert.strictEqual(hashMap.has("key3"), true);
  });
});
