import { beforeEach, describe, it } from "node:test";
import { DoublyLinkedList } from "./doubly-linked-list.practice.ts";
import assert from "node:assert";

describe("DoublyDoublyLinkedList", () => {
  describe("with reversing list", () => {
    it("should reverse the list", () => {
      const list: DoublyLinkedList<number> = new DoublyLinkedList<number>();

      list.append(1);
      list.append(2);
      list.append(3);
      list.reverse();

      assert.strictEqual(list.get(0), 3);
      assert.strictEqual(list.get(1), 2);
    });

    it("should return null for reverse when list is empty", () => {
      const list: DoublyLinkedList<number> = new DoublyLinkedList<number>();

      assert.strictEqual(list.reverse(), undefined);
    });
  });

  describe("with filled list (push)", () => {
    let list: DoublyLinkedList<number> = new DoublyLinkedList<number>();

    beforeEach(() => {
      list = new DoublyLinkedList<number>();
      list.push(1);
      list.push(2);
      list.push(3);
    });

    it("should return false for isEmpty when list is not empty", () => {
      assert.strictEqual(list.isEmpty(), false);
    });

    it("should return correct node for get", () => {
      assert.strictEqual(list.get(1), 2);
    });

    it("should push nodes to the list and return correct head and tail", () => {
      assert.strictEqual(list.get(0), 3);
      assert.strictEqual(list.get(2), 1);
    });

    it("should pop nodes from the list and return correct head and tail", () => {
      assert.strictEqual(list.pop(), 3);
      assert.strictEqual(list.get(0), 2);
      assert.strictEqual(list.get(1), 1);
    });
  });

  describe("with filled list (append)", () => {
    let list: DoublyLinkedList<number> = new DoublyLinkedList<number>();

    beforeEach(() => {
      list = new DoublyLinkedList<number>();
      list.append(1);
      list.append(2);
      list.append(3);
    });

    it("should append nodes to the list and return correct head and tail", () => {
      assert.strictEqual(list.get(0), 1);
      assert.strictEqual(list.get(2), 3);
    });

    it("should remove tail from the list and return correct head and tail", () => {
      assert.strictEqual(list.removeTail(), 3);
      assert.strictEqual(list.get(0), 1);
      assert.strictEqual(list.get(1), 2);
    });

    it("should insert nodes at the correct index", () => {
      list.insertAt(1, 4);

      assert.strictEqual(list.get(1), 4);
    });

    it("should remove nodes at the correct index", () => {
      assert.strictEqual(list.removeAt(1), 2);
    });

    it("should throw error for removeAt when index is out of bounds", () => {
      assert.throws(() => list.removeAt(3), RangeError);
    });

    it("should clear the list", () => {
      list.clear();

      assert.strictEqual(list.isEmpty(), true);
    });

    it("should convert the list to an array", () => {
      assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
    });

    it("should return correct length", () => {
      assert.strictEqual(list.getLength(), 3);
    });
  });

  describe("with empty list", () => {
    let list: DoublyLinkedList<number>;

    beforeEach(() => {
      list = new DoublyLinkedList<number>();
    });

    it("should return true for isEmpty when list is empty", () => {
      assert.strictEqual(list.isEmpty(), true);
    });

    it("should throw for get when index is out of bounds", () => {
      assert.throws(() => list.get(1), RangeError);
    });

    it("should return undefined for pop when list is empty", () => {
      assert.strictEqual(list.pop(), undefined);
    });

    it("should return undefined for removeTail when list is empty", () => {
      assert.strictEqual(list.removeTail(), undefined);
    });
  });
});
