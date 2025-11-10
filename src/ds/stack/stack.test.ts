import { beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import { Stack } from "./stack.practice.ts";

describe("Stack", () => {
  let stack: Stack<number>;
  beforeEach(() => {
    stack = new Stack<number>();
    stack.push(4);
    stack.push(1);
    stack.push(2);
    stack.push(3);
  });

  it("should get the top element from the stack", () => {
    assert.strictEqual(stack.peek(), 3);
  });

  it("should remove the top element from the stack and give the new top element", () => {
    assert.strictEqual(stack.pop(), 3);
    assert.strictEqual(stack.peek(), 2);
  });

  it("should add a new element on top", () => {
    stack.push(5);
    assert.strictEqual(stack.peek(), 5);
  });

  it("should check if stack is empty", () => {
    assert.strictEqual(stack.isEmpty(), false);
    const emptyStack = new Stack<number>();
    assert.strictEqual(emptyStack.isEmpty(), true);
  });

  it("should return null when popping from an empty stack", () => {
    const emptyStack = new Stack<number>();
    assert.strictEqual(emptyStack.pop(), null);
  });

  it("should return null when peeking at an empty stack", () => {
    const emptyStack = new Stack<number>();
    assert.strictEqual(emptyStack.peek(), null);
  });

  it("should track the correct length of the stack", () => {
    assert.strictEqual(stack.length(), 4);
    stack.push(10);
    assert.strictEqual(stack.length(), 5);
    stack.pop();
    assert.strictEqual(stack.length(), 4);
  });
});
