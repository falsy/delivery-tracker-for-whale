import ICacheWebStorage from "./interfaces/ICacheWebStorage"

export default class CacheWebStorage implements ICacheWebStorage {
  private readonly storage: Storage = globalThis.localStorage

  getItem(key: string): string {
    return this.storage.getItem(key)
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value)
  }

  removeItem(key: string): void {
    this.storage.removeItem(key)
  }

  clear(): void {
    this.storage.clear()
  }
}
