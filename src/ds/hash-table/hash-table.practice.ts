import { LinkedList } from "../linked-list/linked-list.ts";

export class HashTable<K extends string, V = unknown> implements IMap<K, V> {
  public buckets: Array<LinkedList<MapEntry<K, V>>>;
  public hashIndexMap: Partial<Record<K, number>>;
  private capacity: number = 16;

  constructor() {
    this.buckets = new Array(this.capacity).fill(undefined).map(() => new LinkedList())
    this.hashIndexMap = {};
  }

  getSize(): number {
    return Object.keys(this.hashIndexMap).length;
  }

  set(key: K, value: V): void {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
    }
    const bucket = this.buckets[index];

    if (this.has(key)) {
      const node = bucket.toArray().find((item) => item?.key === key);
      if (!node) throw new Error();
      node.value = value;
    } else {
      bucket.append(new MapEntry(key, value));
    }

    this.hashIndexMap[key] = index;
  }

  get(key: K): V | null {
    const index = this.hashIndexMap[key];
    if (index === undefined) return null;
    const bucket = this.buckets[index];

    if (!bucket) {
      return null;
    }

    const node = bucket.toArray().find((item) => item?.key === key);
    return node?.value ?? null;
  }

  delete(key: K): void {
    const index = this.hashIndexMap[key];
    if (index === undefined) return;

    const bucket = this.buckets[index];
    if (!bucket) return;

    const nodeIndex = bucket.toArray().findIndex((node) => node?.key === key);
    bucket.removeAt(nodeIndex);

    delete this.hashIndexMap[key];
  }

  has(key: K): boolean {
    return Object.hasOwn(this.hashIndexMap, key);
  }

  clear(): void {
    this.buckets = new Array(this.capacity);
    this.hashIndexMap = {};
  }

  keys(): K[] {
    return Object.keys(this.hashIndexMap) as K[];
  }

  values(): V[] {
    return this.buckets.flatMap((bucket) =>
      bucket
        .toArray()
        .map((item) => item?.value)
        .filter((item): item is V => item !== undefined),
    );
  }

  entries(): MapEntry<K, V>[] {
    return this.buckets.flatMap((bucket) =>
      bucket
        .toArray()
        .filter((item): item is MapEntry<K, V> => item !== undefined),
    );
  }

  *[Symbol.iterator](): Iterator<[K, V]> {
    for (const bucket of this.buckets) {
      for (const entry of bucket.toArray()) {
        if (entry) {
          yield [entry.key, entry.value];
        }
      }
    }
  }

  private hash(key: K) {
    const total = key
      .split("")
      .reduce((acc, curr) => acc + curr.charCodeAt(0), 0);

    const hash = total % this.capacity;
    return hash;
  }
}

export class MapEntry<K, V> {
  key: K;
  value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

interface IMap<K, V> {
  getSize(): number;
  set(key: K, value: V): void;
  get(key: K): V | null;
  delete(key: K): void;
  has(key: K): boolean;
  clear(): void;
  keys(): K[];
  values(): V[];
  entries(): MapEntry<K, V>[];
  [Symbol.iterator](): Iterator<[K, V]>;
}
