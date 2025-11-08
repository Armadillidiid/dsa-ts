export class HashTableOpenAddressing<K extends string, V = unknown>
  implements IMap<K, V>
{
  private buckets: Array<MapEntry<K, V> | null | DeletedEntry>;
  private capacity: number = 16;
  private loadFactor: number = 0.5; // Lower load factor for open addressing
  private size: number = 0;
  private readonly DELETED = new DeletedEntry();

  constructor() {
    this.buckets = new Array(this.capacity).fill(null);
  }

  getSize(): number {
    return this.size;
  }

  getCapacity(): number {
    return this.capacity;
  }

  set(key: K, value: V): void {
    // Check if we need to resize before inserting
    if ((this.size + 1) / this.capacity > this.loadFactor) {
      this.resize();
    }

    const index = this.findSlot(key);
    const entry = this.buckets[index];

    if (
      entry === null ||
      entry === undefined ||
      entry instanceof DeletedEntry
    ) {
      // Empty slot or deleted slot - insert new entry
      this.buckets[index] = new MapEntry(key, value);
      this.size++;
    } else {
      // Key exists - update value (entry is MapEntry here)
      entry.value = value;
    }
  }

  get(key: K): V | null {
    const index = this.findKey(key);
    if (index === -1) return null;

    const entry = this.buckets[index];
    return entry && !(entry instanceof DeletedEntry) ? entry.value : null;
  }

  delete(key: K): void {
    const index = this.findKey(key);
    if (index === -1) return;

    // Mark as deleted instead of setting to null
    // This maintains the probe sequence for other keys
    this.buckets[index] = this.DELETED;
    this.size--;
  }

  has(key: K): boolean {
    return this.findKey(key) !== -1;
  }

  clear(): void {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys(): K[] {
    const result: K[] = [];
    for (const entry of this.buckets) {
      if (entry && !(entry instanceof DeletedEntry)) {
        result.push(entry.key);
      }
    }
    return result;
  }

  values(): V[] {
    const result: V[] = [];
    for (const entry of this.buckets) {
      if (entry && !(entry instanceof DeletedEntry)) {
        result.push(entry.value);
      }
    }
    return result;
  }

  entries(): MapEntry<K, V>[] {
    const result: MapEntry<K, V>[] = [];
    for (const entry of this.buckets) {
      if (entry && !(entry instanceof DeletedEntry)) {
        result.push(entry);
      }
    }
    return result;
  }

  *[Symbol.iterator](): Iterator<[K, V]> {
    for (const entry of this.buckets) {
      if (entry && !(entry instanceof DeletedEntry)) {
        yield [entry.key, entry.value];
      }
    }
  }

  private hash(key: K): number {
    const total = key
      .split("")
      .reduce((acc, curr) => acc + curr.charCodeAt(0), 0);

    return total % this.capacity;
  }

  /**
   * Find the slot where a key should be inserted.
   * Uses linear probing to find the next available slot.
   * Returns the index of either an empty/deleted slot or the existing key.
   */
  private findSlot(key: K): number {
    let index = this.hash(key);
    let firstDeletedIndex = -1;

    for (let i = 0; i < this.capacity; i++) {
      const currentIndex = (index + i) % this.capacity;
      const entry = this.buckets[currentIndex];

      if (entry === null || entry === undefined) {
        // Empty slot - use first deleted slot if we found one, otherwise use this
        return firstDeletedIndex !== -1 ? firstDeletedIndex : currentIndex;
      } else if (entry instanceof DeletedEntry) {
        // Remember first deleted slot but keep searching for the key
        if (firstDeletedIndex === -1) {
          firstDeletedIndex = currentIndex;
        }
      } else {
        // entry is MapEntry here
        if (entry.key === key) {
          return currentIndex;
        }
      }
    }

    // Table is full or we found a deleted slot
    return firstDeletedIndex !== -1 ? firstDeletedIndex : index;
  }

  /**
   * Find the index of an existing key.
   * Returns -1 if the key is not found.
   */
  private findKey(key: K): number {
    let index = this.hash(key);

    for (let i = 0; i < this.capacity; i++) {
      const currentIndex = (index + i) % this.capacity;
      const entry = this.buckets[currentIndex];

      if (entry === null || entry === undefined) {
        // Empty slot means key doesn't exist
        return -1;
      } else if (!(entry instanceof DeletedEntry)) {
        // entry is MapEntry here
        if (entry.key === key) {
          return currentIndex;
        }
      }
      // Continue probing if deleted or different key
    }

    return -1;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;

    // Rehash all existing entries
    for (const entry of oldBuckets) {
      if (entry && !(entry instanceof DeletedEntry)) {
        this.set(entry.key, entry.value);
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

/**
 * Marker class for deleted entries in the hash table.
 * This is used to maintain the probe sequence for linear probing.
 */
class DeletedEntry {
  // Marker field to distinguish from MapEntry
  readonly isDeleted = true;
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
