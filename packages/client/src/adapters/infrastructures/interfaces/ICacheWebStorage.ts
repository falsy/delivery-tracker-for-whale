export default interface ICacheWebStorage {
  getItem(key: string): string
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
}
