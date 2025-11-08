import { LinkedList } from "../linked-list/linked-list.ts";

export class HashTable<K extends string, V = unknown> implements IMap<K, V> {
  public buckets: Array<LinkedList<MapEntry<K, V>>>;
  private capacity: number = 16;
  private loadFactor: number = 0.75;
  private size: number = 0;

  constructor() {
    this.buckets = this.initializeBuckets(this.capacity);
  }

  getSize(): number {
    return this.size;
  }

  getCapacity(): number {
    return this.capacity;
  }

  set(key: K, value: V): void {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
    }
    const bucket = this.buckets[index];

    const existingNode = bucket.toArray().find((item) => item?.key === key);
    if (existingNode) {
      existingNode.value = value;
    } else {
      bucket.append(new MapEntry(key, value));
      this.size++;

      // Check if we need to resize
      if (this.size / this.capacity > this.loadFactor) {
        this.resize();
      }
    }
  }

  get(key: K): V | null {
    const index = this.hash(key);
    if (index === undefined) return null;
    const bucket = this.buckets[index];

    if (!bucket) {
      return null;
    }

    const node = bucket.toArray().find((item) => item?.key === key);
    return node?.value ?? null;
  }

  delete(key: K): void {
    const index = this.hash(key);

    const bucket = this.buckets[index];
    if (!bucket) return;

    const nodeIndex = bucket.toArray().findIndex((node) => node?.key === key);
    if (nodeIndex === -1) return;
    bucket.removeAt(nodeIndex);
    this.size--;
  }

  has(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    return !!bucket?.toArray().find((item) => item?.key === key);
  }

  clear(): void {
    this.buckets = this.initializeBuckets(this.capacity);
    this.size = 0;
  }

  keys(): K[] {
    return this.buckets.flatMap((bucket) =>
      bucket
        .toArray()
        .map((entry) => entry?.key)
        .filter((key): key is K => key !== undefined)
    );
  }

  values(): V[] {
    return this.buckets.flatMap((bucket) =>
      bucket
        .toArray()
        .map((item) => item?.value)
        .filter((item) => item !== undefined)
    );
  }

  entries(): MapEntry<K, V>[] {
    return this.buckets.flatMap((bucket) =>
      bucket
        .toArray()
        .filter((item): item is MapEntry<K, V> => item !== undefined)
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

  private initializeBuckets<K, V>(capacity: number) {
    return new Array(capacity)
      .fill(undefined)
      .map(() => new LinkedList<MapEntry<K, V>>());
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = this.initializeBuckets(this.capacity);
    this.size = 0;

    // Rehash all existing entries
    for (const bucket of oldBuckets) {
      for (const entry of bucket.toArray()) {
        if (entry) {
          this.set(entry.key, entry.value);
        }
      }
    }
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
