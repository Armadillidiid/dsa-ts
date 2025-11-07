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
});
