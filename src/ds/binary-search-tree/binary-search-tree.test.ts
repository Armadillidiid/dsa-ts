import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { BinarySearchTree, Node } from "./binary-search-tree.practice.ts";

describe("BinarySearchTree", () => {
  it("should create an instance", () => {
    const instance = new BinarySearchTree();
    assert.ok(instance);
  });

  describe("constructor", () => {
    it("should initialize with root as undefined and count as 0", () => {
      const bst = new BinarySearchTree<number>();
      assert.strictEqual(bst.root, undefined);
      assert.strictEqual(bst.count, 0);
    });

    it("should accept a custom comparator function", () => {
      const reverseComparator = (a: number, b: number) => b - a;
      const bst = new BinarySearchTree<number>(reverseComparator);
      assert.strictEqual(bst.compare, reverseComparator);
    });
  });

  describe("insert", () => {
    it("should insert a single value as root", () => {
      const bst = new BinarySearchTree<number>();
      const node = bst.insert(10);
      assert.ok(node);
      assert.strictEqual(node.value, 10);
      assert.strictEqual(bst.root?.value, 10);
      assert.strictEqual(bst.count, 1);
    });

    it("should insert multiple values correctly", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      assert.strictEqual(bst.count, 3);
      assert.strictEqual(bst.root?.value, 10);
      assert.strictEqual(bst.root?.left?.value, 5);
      assert.strictEqual(bst.root?.right?.value, 15);
    });

    it("should build a valid BST structure", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(50);
      bst.insert(30);
      bst.insert(70);
      bst.insert(20);
      bst.insert(40);
      bst.insert(60);
      bst.insert(80);

      assert.strictEqual(bst.count, 7);
      assert.strictEqual(bst.root?.value, 50);
      assert.strictEqual(bst.root?.left?.value, 30);
      assert.strictEqual(bst.root?.right?.value, 70);
      assert.strictEqual(bst.root?.left?.left?.value, 20);
      assert.strictEqual(bst.root?.left?.right?.value, 40);
      assert.strictEqual(bst.root?.right?.left?.value, 60);
      assert.strictEqual(bst.root?.right?.right?.value, 80);
    });

    it("should return the inserted node", () => {
      const bst = new BinarySearchTree<number>();
      const node = bst.insert(42);
      assert.ok(node instanceof Node);
      assert.strictEqual(node.value, 42);
    });
  });

  describe("has", () => {
    it("should return false for empty tree", () => {
      const bst = new BinarySearchTree<number>();
      assert.strictEqual(bst.has(10), false);
    });

    it("should return true for existing value", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      assert.strictEqual(bst.has(10), true);
      assert.strictEqual(bst.has(5), true);
      assert.strictEqual(bst.has(15), true);
    });

    it("should return false for non-existing value", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      assert.strictEqual(bst.has(3), false);
      assert.strictEqual(bst.has(20), false);
    });
  });

  describe("find", () => {
    it("should return undefined for empty tree", () => {
      const bst = new BinarySearchTree<number>();
      assert.strictEqual(bst.find(10), undefined);
    });

    it("should find existing nodes", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);

      const node = bst.find(5);
      assert.ok(node);
      assert.strictEqual(node.value, 5);
    });

    it("should return undefined for non-existing values", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      assert.strictEqual(bst.find(20), undefined);
    });

    it("should find root node", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      const node = bst.find(10);
      assert.ok(node);
      assert.strictEqual(node.value, 10);
    });
  });

  describe.skip("min", () => {
    it("should return undefined for empty tree", () => {
      const bst = new BinarySearchTree<number>();
      assert.strictEqual(bst.min(), undefined);
    });

    it("should find minimum value in tree", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);

      const min = bst.min();
      assert.ok(min);
      assert.strictEqual(min.value, 3);
    });

    it("should find minimum value in subtree when node is provided", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(12);
      bst.insert(20);

      const min = bst.min(bst.root?.right);
      assert.ok(min);
      assert.strictEqual(min.value, 12);
    });

    it("should return root when it is the minimum", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(15);
      bst.insert(20);

      const min = bst.min();
      assert.ok(min);
      assert.strictEqual(min.value, 10);
    });
  });

  describe.skip("max", () => {
    it("should return undefined for empty tree", () => {
      const bst = new BinarySearchTree<number>();
      assert.strictEqual(bst.max(), undefined);
    });

    it("should find maximum value in tree", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(12);
      bst.insert(20);

      const max = bst.max();
      assert.ok(max);
      assert.strictEqual(max.value, 20);
    });

    it("should find maximum value in subtree when node is provided", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);

      const max = bst.max(bst.root?.left);
      assert.ok(max);
      assert.strictEqual(max.value, 7);
    });

    it("should return root when it is the maximum", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(3);

      const max = bst.max();
      assert.ok(max);
      assert.strictEqual(max.value, 10);
    });
  });

  describe("remove", () => {
    it("should return false for empty tree", () => {
      const bst = new BinarySearchTree<number>();
      assert.strictEqual(bst.remove(10), false);
      assert.strictEqual(bst.count, 0);
    });

    it("should return false for non-existing value", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      assert.strictEqual(bst.remove(20), false);
      assert.strictEqual(bst.count, 2);
    });

    describe("removing leaf nodes", () => {
      it("should remove left leaf node", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);

        assert.strictEqual(bst.remove(5), true);
        assert.strictEqual(bst.count, 2);
        assert.strictEqual(bst.has(5), false);
        assert.strictEqual(bst.root?.left, undefined);
        assert.strictEqual(bst.root?.right?.value, 15);
      });

      it("should remove right leaf node", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);

        assert.strictEqual(bst.remove(15), true);
        assert.strictEqual(bst.count, 2);
        assert.strictEqual(bst.has(15), false);
        assert.strictEqual(bst.root?.right, undefined);
        assert.strictEqual(bst.root?.left?.value, 5);
      });

      it("should remove deep leaf node", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);

        assert.strictEqual(bst.remove(3), true);
        assert.strictEqual(bst.count, 4);
        assert.strictEqual(bst.has(3), false);
        assert.strictEqual(bst.root?.left?.left, undefined);
      });
    });

    describe("removing nodes with one child", () => {
      it("should remove node with only left child", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(5);
        bst.insert(3);

        assert.strictEqual(bst.remove(5), true);
        assert.strictEqual(bst.count, 2);
        assert.strictEqual(bst.root?.left?.value, 3);
        assert.strictEqual(bst.has(5), false);
      });

      it("should remove node with only right child", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(15);
        bst.insert(20);

        assert.strictEqual(bst.remove(15), true);
        assert.strictEqual(bst.count, 2);
        assert.strictEqual(bst.root?.right?.value, 20);
        assert.strictEqual(bst.has(15), false);
      });

      it("should remove node with left child that has its own subtree", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(20);
        bst.insert(10);
        bst.insert(5);
        bst.insert(3);
        bst.insert(7);

        assert.strictEqual(bst.remove(10), true);
        assert.strictEqual(bst.count, 4);
        assert.strictEqual(bst.root?.left?.value, 5);
        assert.strictEqual(bst.root?.left?.left?.value, 3);
        assert.strictEqual(bst.root?.left?.right?.value, 7);
      });

      it("should remove node with right child that has its own subtree", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(20);
        bst.insert(25);
        bst.insert(22);
        bst.insert(30);

        assert.strictEqual(bst.remove(20), true);
        assert.strictEqual(bst.count, 4);
        assert.strictEqual(bst.root?.right?.value, 25);
        assert.strictEqual(bst.root?.right?.left?.value, 22);
        assert.strictEqual(bst.root?.right?.right?.value, 30);
      });
    });

    describe("removing nodes with two children", () => {
      it("should remove node with two children (simple case)", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);
        bst.insert(12);
        bst.insert(20);

        assert.strictEqual(bst.remove(15), true);
        assert.strictEqual(bst.count, 6);
        assert.strictEqual(bst.has(15), false);

        // Verify BST property is maintained
        assert.ok(bst.root?.right);
        const rightValue = bst.root.right.value;
        assert.ok(
          rightValue > 10,
          `Right subtree root ${rightValue} should be > 10`
        );
        assert.ok(
          rightValue === 20 || rightValue === 12,
          `Should be replaced by successor (12 or 20)`
        );

        // Verify all remaining nodes are still present
        assert.strictEqual(bst.has(10), true);
        assert.strictEqual(bst.has(5), true);
        assert.strictEqual(bst.has(3), true);
        assert.strictEqual(bst.has(7), true);
        assert.strictEqual(bst.has(12), true);
        assert.strictEqual(bst.has(20), true);
      });

      it("should remove node with two children where successor is immediate right child", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(20);

        assert.strictEqual(bst.remove(15), true);
        assert.strictEqual(bst.count, 3);
        assert.strictEqual(bst.has(15), false);
        assert.strictEqual(bst.root?.right?.value, 20);
      });

      it("should remove node with two children where successor is deep in right subtree", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(50);
        bst.insert(30);
        bst.insert(70);
        bst.insert(60);
        bst.insert(80);
        bst.insert(55);
        bst.insert(65);

        assert.strictEqual(bst.remove(70), true);
        assert.strictEqual(bst.count, 6);
        assert.strictEqual(bst.has(70), false);

        // The successor should be 80 (min in right subtree)
        // Verify BST structure is maintained
        const inOrderValues: number[] = [];
        bst.traverseInOrder((node) => inOrderValues.push(node.value));

        // Should still be sorted
        for (let i = 1; i < inOrderValues.length; i++) {
          assert.ok(
            inOrderValues[i] > inOrderValues[i - 1],
            `Values should be sorted: ${inOrderValues}`
          );
        }
      });

      it("should remove node with complex subtree on both sides", () => {
        const bst = new BinarySearchTree<number>();
        // Build a more complex tree
        const values = [
          50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85,
        ];
        values.forEach((v) => bst.insert(v));

        assert.strictEqual(bst.remove(30), true);
        assert.strictEqual(bst.count, 14);
        assert.strictEqual(bst.has(30), false);

        // Verify all other nodes are still present and accessible
        values.forEach((v) => {
          if (v !== 30) {
            assert.strictEqual(
              bst.has(v),
              true,
              `Should still have value ${v}`
            );
          }
        });

        // Verify BST property
        const inOrderValues: number[] = [];
        bst.traverseInOrder((node) => inOrderValues.push(node.value));
        for (let i = 1; i < inOrderValues.length; i++) {
          assert.ok(inOrderValues[i] > inOrderValues[i - 1]);
        }
      });
    });

    describe("removing root node", () => {
      it("should remove root node when it's the only node", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);

        assert.strictEqual(bst.remove(10), true);
        assert.strictEqual(bst.count, 0);
        assert.strictEqual(bst.root, undefined);
      });

      it("should remove root node with only left child", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(5);

        assert.strictEqual(bst.remove(10), true);
        assert.strictEqual(bst.count, 1);
        assert.strictEqual(bst.root?.value, 5);
      });

      it("should remove root node with only right child", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(15);

        assert.strictEqual(bst.remove(10), true);
        assert.strictEqual(bst.count, 1);
        assert.strictEqual(bst.root?.value, 15);
      });

      it("should remove root node with two children", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);

        assert.strictEqual(bst.remove(10), true);
        assert.strictEqual(bst.count, 2);
        assert.strictEqual(bst.has(10), false);
        assert.ok(bst.root);

        // New root should be either 5 or 15 depending on implementation
        const newRoot = bst.root.value;
        assert.ok(newRoot === 5 || newRoot === 15);

        // Both remaining values should still be in tree
        assert.strictEqual(bst.has(5), true);
        assert.strictEqual(bst.has(15), true);
      });

      it("should remove root with complex subtrees", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(50);
        bst.insert(30);
        bst.insert(70);
        bst.insert(20);
        bst.insert(40);
        bst.insert(60);
        bst.insert(80);

        assert.strictEqual(bst.remove(50), true);
        assert.strictEqual(bst.count, 6);
        assert.strictEqual(bst.has(50), false);

        // Verify BST property maintained
        const inOrderValues: number[] = [];
        bst.traverseInOrder((node) => inOrderValues.push(node.value));
        assert.deepStrictEqual(inOrderValues, [20, 30, 40, 60, 70, 80]);
      });
    });

    describe("sequential removals", () => {
      it("should handle removing all nodes sequentially", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);

        assert.strictEqual(bst.remove(5), true);
        assert.strictEqual(bst.count, 2);

        assert.strictEqual(bst.remove(15), true);
        assert.strictEqual(bst.count, 1);

        assert.strictEqual(bst.remove(10), true);
        assert.strictEqual(bst.count, 0);
        assert.strictEqual(bst.root, undefined);
      });

      it("should handle removing multiple nodes with two children", () => {
        const bst = new BinarySearchTree<number>();
        const values = [50, 30, 70, 20, 40, 60, 80];
        values.forEach((v) => bst.insert(v));

        assert.strictEqual(bst.remove(30), true);
        assert.strictEqual(bst.remove(70), true);
        assert.strictEqual(bst.count, 5);

        // Verify remaining structure is valid
        const remaining = [50, 20, 40, 60, 80];
        remaining.forEach((v) => {
          assert.strictEqual(bst.has(v), true);
        });

        const inOrderValues: number[] = [];
        bst.traverseInOrder((node) => inOrderValues.push(node.value));
        for (let i = 1; i < inOrderValues.length; i++) {
          assert.ok(inOrderValues[i] > inOrderValues[i - 1]);
        }
      });

      it("should maintain BST property after removing in random order", () => {
        const bst = new BinarySearchTree<number>();
        const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];
        values.forEach((v) => bst.insert(v));

        // Remove in specific order to test various scenarios
        const toRemove = [40, 20, 70, 50];
        toRemove.forEach((v) => {
          assert.strictEqual(bst.remove(v), true);
        });

        assert.strictEqual(bst.count, 7);

        // Verify BST property
        const inOrderValues: number[] = [];
        bst.traverseInOrder((node) => inOrderValues.push(node.value));
        for (let i = 1; i < inOrderValues.length; i++) {
          assert.ok(inOrderValues[i] > inOrderValues[i - 1]);
        }
      });
    });

    describe("edge cases and stress tests", () => {
      it("should handle removing from right-skewed tree", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(20);
        bst.insert(30);
        bst.insert(40);

        assert.strictEqual(bst.remove(20), true);
        assert.strictEqual(bst.count, 3);
        assert.strictEqual(bst.has(20), false);

        const inOrderValues: number[] = [];
        bst.traverseInOrder((node) => inOrderValues.push(node.value));
        assert.deepStrictEqual(inOrderValues, [10, 30, 40]);
      });

      it("should handle removing from left-skewed tree", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(40);
        bst.insert(30);
        bst.insert(20);
        bst.insert(10);

        assert.strictEqual(bst.remove(30), true);
        assert.strictEqual(bst.count, 3);
        assert.strictEqual(bst.has(30), false);

        const inOrderValues: number[] = [];
        bst.traverseInOrder((node) => inOrderValues.push(node.value));
        assert.deepStrictEqual(inOrderValues, [10, 20, 40]);
      });

      it("should handle removing duplicate removal attempts", () => {
        const bst = new BinarySearchTree<number>();
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);

        assert.strictEqual(bst.remove(5), true);
        assert.strictEqual(bst.count, 2);

        // Try to remove again
        assert.strictEqual(bst.remove(5), false);
        assert.strictEqual(bst.count, 2);
      });
    });
  });

  describe("traverseInOrder", () => {
    it("should traverse empty tree without error", () => {
      const bst = new BinarySearchTree<number>();
      const values: number[] = [];
      bst.traverseInOrder((node) => values.push(node.value));
      assert.deepStrictEqual(values, []);
    });

    it("should traverse in sorted order (left-root-right)", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(12);
      bst.insert(20);

      const values: number[] = [];
      bst.traverseInOrder((node) => values.push(node.value));
      assert.deepStrictEqual(values, [3, 5, 7, 10, 12, 15, 20]);
    });

    it("should abort traversal when abortCb returns true", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);

      const values: number[] = [];
      bst.traverseInOrder(
        (node) => values.push(node.value),
        () => values.length >= 3
      );
      assert.strictEqual(values.length, 3);
      assert.deepStrictEqual(values, [3, 5, 7]);
    });
  });

  describe.only("traversePreOrder", () => {
    it("should traverse empty tree without error", () => {
      const bst = new BinarySearchTree<number>();
      const values: number[] = [];
      bst.traversePreOrder((node) => values.push(node.value));
      assert.deepStrictEqual(values, []);
    });

    it("should traverse in pre-order (root-left-right)", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(12);
      bst.insert(20);

      const values: number[] = [];
      bst.traversePreOrder((node) => values.push(node.value));
      assert.deepStrictEqual(values, [10, 5, 3, 7, 15, 12, 20]);
    });

    it("should abort traversal when abortCb returns true", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);

      const values: number[] = [];
      bst.traversePreOrder(
        (node) => values.push(node.value),
        () => values.length >= 3
      );
      assert.strictEqual(values.length, 3);
      assert.deepStrictEqual(values, [10, 5, 3]);
    });
  });

  describe("traversePostOrder", () => {
    it("should traverse empty tree without error", () => {
      const bst = new BinarySearchTree<number>();
      const values: number[] = [];
      bst.traversePostOrder((node) => values.push(node.value));
      assert.deepStrictEqual(values, []);
    });

    it("should traverse in post-order (left-right-root)", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(12);
      bst.insert(20);

      const values: number[] = [];
      bst.traversePostOrder((node) => values.push(node.value));
      assert.deepStrictEqual(values, [3, 7, 5, 12, 20, 15, 10]);
    });

    it("should abort traversal when abortCb returns true", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);

      const values: number[] = [];
      bst.traversePostOrder(
        (node) => values.push(node.value),
        () => values.length >= 3
      );
      assert.strictEqual(values.length, 3);
      assert.deepStrictEqual(values, [3, 7, 5]);
    });
  });

  describe("clear", () => {
    it("should clear empty tree", () => {
      const bst = new BinarySearchTree<number>();
      bst.clear();
      assert.strictEqual(bst.root, undefined);
      assert.strictEqual(bst.count, 0);
    });

    it("should remove all nodes from tree", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);

      bst.clear();
      assert.strictEqual(bst.root, undefined);
      assert.strictEqual(bst.count, 0);
    });

    it("should allow inserting after clear", () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.clear();

      bst.insert(20);
      assert.strictEqual(bst.count, 1);
      assert.strictEqual(bst.root?.value, 20);
    });
  });

  describe("count property", () => {
    it("should track count correctly through operations", () => {
      const bst = new BinarySearchTree<number>();
      assert.strictEqual(bst.count, 0);

      bst.insert(10);
      assert.strictEqual(bst.count, 1);

      bst.insert(5);
      bst.insert(15);
      assert.strictEqual(bst.count, 3);

      bst.remove(5);
      assert.strictEqual(bst.count, 2);

      bst.clear();
      assert.strictEqual(bst.count, 0);
    });
  });

  describe("working with different data types", () => {
    it("should work with strings", () => {
      const bst = new BinarySearchTree<string>();
      bst.insert("banana");
      bst.insert("apple");
      bst.insert("cherry");

      const values: string[] = [];
      bst.traverseInOrder((node) => values.push(node.value));
      assert.deepStrictEqual(values, ["apple", "banana", "cherry"]);
    });

    it("should work with custom comparator for objects", () => {
      interface Person {
        name: string;
        age: number;
      }

      const comparator = (a: Person, b: Person) => {
        if (a.age === b.age) return 0;
        return a.age > b.age ? 1 : -1;
      };

      const bst = new BinarySearchTree<Person>(comparator);
      bst.insert({ name: "Alice", age: 30 });
      bst.insert({ name: "Bob", age: 25 });
      bst.insert({ name: "Charlie", age: 35 });

      const ages: number[] = [];
      bst.traverseInOrder((node) => ages.push(node.value.age));
      assert.deepStrictEqual(ages, [25, 30, 35]);
    });
  });
});
