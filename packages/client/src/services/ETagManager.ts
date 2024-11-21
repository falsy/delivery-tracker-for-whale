import IETagManager from "./interfaces/IETagManager"

export default class ETagManager implements IETagManager {
  private etagHashTable = new Map<string, { etag: string; data: unknown }>()

  getETag(url: string) {
    return this.etagHashTable.has(url) ? this.etagHashTable.get(url).etag : null
  }

  getData(url: string) {
    return this.etagHashTable.has(url) ? this.etagHashTable.get(url).data : null
  }

  setETagData(url: string, etag: string, data: unknown) {
    this.etagHashTable.set(url, {
      etag,
      data
    })
  }
}
