export default interface IETagManager {
  getETag(url: string): string | null
  getData(url: string): unknown | null
  setETagData(url: string, etag: string, data: unknown): void
}
