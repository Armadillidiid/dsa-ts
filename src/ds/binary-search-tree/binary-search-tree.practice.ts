export class BinarySearchTree<T = unknown> implements IBinarySearchTree<T> {
  public root: Node<T> | undefined;
  public count: number;
  public compare: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number) {
    this.count = 0;
    this.compare =
      compare ??
      ((a: T, b: T): number => {
        if (a === b) return 0;
        return a > b ? 1 : -1;
      });
  }

  insert(value: T): Node<T> {
    const node = new Node(value);

    const recursion = (currNode: Node<T>): void => {
      const compare = this.compare(node.value, currNode.value);

      if (compare < 0) {
        if (currNode.left) {
          recursion(currNode.left);
        } else {
          currNode.left = node;
          this.count++;
        }
      } else if (compare > 0) {
        if (currNode.right) {
          recursion(currNode.right);
        } else {
          currNode.right = node;
          this.count++;
        }
      } else {
        currNode.value = value;
      }
    };

    if (!this.root) {
      this.root = node;
      this.count++;
    } else {
      recursion(this.root);
    }

    return node;
  }

  insertIterative(value: T): Node<T> {
    const node = new Node(value);

    if (!this.root) {
      this.root = node;
      this.count++;
      return node;
    }

    let currNode = this.root;
    while (true) {
      const compare = this.compare(node.value, currNode.value);
      if (compare < 0) {
        if (currNode.left) {
          currNode = currNode.left;
        } else {
          currNode.left = node;
          this.count++;
          break;
        }
      } else if (compare > 0) {
        if (currNode.right) {
          currNode = currNode.right;
        } else {
          currNode.right = node;
          this.count++;
          break;
        }
      } else {
        currNode.value = value;
        break;
      }
    }

    return node;
  }

  has(value: T): boolean {
    if (!this.root) return false;
    let found = false;

    const recursion = (node?: Node<T>) => {
      if (found || !node) return;

      if (this.compare(node.value, value) === 0) {
        found = true;
        return;
      }

      recursion(node.left);
      recursion(node.right);
    };

    recursion(this.root);

    return found;
  }

  find(value: T): Node<T> | undefined {
    const recursion = (node?: Node<T>) => {
      if (!node) return;

      const compare = this.compare(value, node.value);
      if (compare === 0) return node;
      if (compare < 0) return recursion(node.left);
      return recursion(node.right);
    };

    return recursion(this.root);
  }

  max(node?: Node<T> | undefined): Node<T> | undefined {
    return undefined; // TODO
  }
  min(node?: Node<T> | undefined): Node<T> | undefined {
    return undefined; // TODO
  }

  remove(value: T): boolean {
    const removeNode = (
      node: Node<T> | undefined,
      parent: Node<T> | undefined,
      valueToRemove: T
    ): boolean => {
      if (!node) return false;

      const compare = this.compare(valueToRemove, node.value);

      if (compare < 0) {
        return removeNode(node.left, node, valueToRemove);
      } else if (compare > 0) {
        return removeNode(node.right, node, valueToRemove);
      } else {
        // Case 1: No children (leaf node)
        if (!node.left && !node.right) {
          if (!parent) {
            this.root = undefined;
          } else if (parent.left === node) {
            parent.left = undefined;
          } else {
            parent.right = undefined;
          }
        }
        // Case 2: Only left child
        else if (node.left && !node.right) {
          if (!parent) {
            this.root = node.left;
          } else if (parent.left === node) {
            parent.left = node.left;
          } else {
            parent.right = node.left;
          }
        }
        // Case 3: Only right child
        else if (!node.left && node.right) {
          if (!parent) {
            this.root = node.right;
          } else if (parent.left === node) {
            parent.left = node.right;
          } else {
            parent.right = node.right;
          }
        }
        // Case 4: Two children
        else {
          let successor = node.right!;
          while (successor.left) {
            successor = successor.left;
          }

          const successorValue = successor.value;
          node.value = successorValue;

          removeNode(node.right, node, successorValue);

          return true;
        }

        this.count--;
        return true;
      }
    };

    return removeNode(this.root, undefined, value);
  }

  traverseInOrder(cb: (node: Node<T>) => void, abortCb?: () => boolean): void {
    const recursion = (node?: Node<T>): void => {
      if (!node) {
        return;
      }

      recursion(node.left);
      if (abortCb && abortCb()) {
        return;
      }
      cb(node);
      recursion(node.right);
    };

    recursion(this.root);
  }

  traverseInOrderIterative(
    cb: (node: Node<T>) => void,
    abortCb?: () => boolean
  ): void {
    if (!this.root) return;

    const stack: Node<T>[] = [];
    let current: Node<T> | undefined = this.root;

    // Keep going while there are nodes to process or nodes in the stack
    while (current || stack.length > 0) {
      // Check abort condition
      if (abortCb && abortCb()) {
        return;
      }

      // Go as far left as possible, pushing nodes onto the stack
      while (current) {
        stack.push(current);
        current = current.left;
      }

      // Pop from stack (this is the leftmost unvisited node)
      current = stack.pop()!;

      // Process the node (this is the "in-order" visit)
      cb(current);

      // Move to the right subtree
      current = current.right;
    }
  }

  traversePreOrder(cb: (node: Node<T>) => void, abortCb?: () => boolean): void {
    const recursion = (node?: Node<T>): void => {
      if (!node) {
        return;
      }

      if (abortCb && abortCb()) {
        return;
      }
      cb(node);
      recursion(node.left);
      recursion(node.right);
    };

    recursion(this.root);
  }

  traversePreOrderIterative(
    cb: (node: Node<T>) => void,
    abortCb?: () => boolean
  ): void {
    if (!this.root) return;

    const stack: Node<T>[] = [this.root];

    while (stack.length > 0) {
      // Check abort condition
      if (abortCb && abortCb()) {
        return;
      }

      // Pop a node from stack
      const current = stack.pop()!;

      // Process the node immediately (PRE-order)
      cb(current);

      // Push right first, then left (so left is processed first)
      // Stack is LIFO, so we push right before left
      if (current.right) {
        stack.push(current.right);
      }
      if (current.left) {
        stack.push(current.left);
      }
    }
  }

  traversePostOrder(
    cb: (node: Node<T>) => void,
    abortCb?: () => boolean
  ): void {
    const recursion = (node?: Node<T>): void => {
      if (!node) {
        return;
      }

      recursion(node.left);
      recursion(node.right);
      if (abortCb && abortCb()) {
        return;
      }
      cb(node);
    };

    recursion(this.root);
  }

  traversePostOrderIterative(
    cb: (node: Node<T>) => void,
    abortCb?: () => boolean
  ): void {
    if (!this.root) return;

    const stack: Node<T>[] = [this.root];
    const visited: Set<Node<T>> = new Set();

    while (stack.length > 0) {
      // Check abort condition
      if (abortCb && abortCb()) {
        return;
      }

      const current = stack[stack.length - 1]; // Peek without popping

      if (!current) continue; // Type guard to satisfy TypeScript

      // If node has no children or both children have been visited
      if (
        (!current.left && !current.right) ||
        ((!current.left || visited.has(current.left)) &&
          (!current.right || visited.has(current.right)))
      ) {
        // Pop and process the node (POST-order)
        stack.pop();
        cb(current);
        visited.add(current);
      } else {
        // Push children (right first, then left)
        if (current.right && !visited.has(current.right)) {
          stack.push(current.right);
        }
        if (current.left && !visited.has(current.left)) {
          stack.push(current.left);
        }
      }
    }
  }

  clear(): void {
    this.root = undefined;
    this.count = 0;
  }
}

export class Node<T = unknown> {
  public left: Node<T> | undefined;
  public right: Node<T> | undefined;
  public value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export interface IBinarySearchTree<T> {
  insert(value: T): Node<T>;
  insertIterative(value: T): Node<T>;
  has(value: T): boolean;
  // hasIterative(value: T): boolean;
  // hasKey(key: number|string): boolean;
  find(value: T): Node<T> | undefined;
  // findIterative(value: T): Node<T> | undefined;
  // findKey(key: number|string): Node<T> | undefined;
  max(node?: Node<T>): Node<T> | undefined;
  // maxIterative(node?: Node<T>): Node<T> | undefined;
  min(node?: Node<T>): Node<T> | undefined;
  // minIterative(node?: Node<T>): Node<T> | undefined;
  // lowerBound(value: T, includeEqual?: boolean): Node<T> | undefined;
  // lowerBoundIterative(value: T, includeEqual?: boolean): Node<T> | undefined;
  // lowerBoundKey(key: number|string, includeEqual?: boolean): Node<T> | undefined;
  // floor(value: T, includeEqual?: boolean): Node<T> | undefined;
  // floorKey(key: number|string, includeEqual?: boolean): Node<T> | undefined;
  // upperBound(value: T, includeEqual?: boolean): Node<T> | undefined;
  // upperBoundIterative(value: T, includeEqual?: boolean): Node<T> | undefined;
  // upperBoundKey(key: number|string, includeEqual?: boolean): Node<T> | undefined;
  // ceil(value: T, includeEqual?: boolean): Node<T> | undefined;
  // ceilKey(key: number|string, includeEqual?: boolean): Node<T> | undefined;
  root: Node<T> | undefined;
  count: number;
  remove(value: T): boolean;
  // removeIterative(value: T): boolean;
  // removeNode(node: Node): boolean;
  traverseInOrder(cb: (node: Node<T>) => void, abortCb?: () => boolean): void;
  traverseInOrderIterative(
    cb: (node: Node<T>) => void,
    abortCb?: () => boolean
  ): void;
  traversePreOrder(cb: (node: Node<T>) => void, abortCb?: () => boolean): void;
  traversePreOrderIterative(
    cb: (node: Node<T>) => void,
    abortCb?: () => boolean
  ): void;
  traversePostOrder(cb: (node: Node<T>) => void, abortCb?: () => boolean): void;
  traversePostOrderIterative(
    cb: (node: Node<T>) => void,
    abortCb?: () => boolean
  ): void;
  clear(): void;
}
