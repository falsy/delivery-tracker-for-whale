import LayerDTO from "../../core/dtos/LayerDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import IBrowserStorage, {
  IBrowserStorageParams
} from "./interfaces/IBrowserStorage"

export default class BrowserStorage implements IBrowserStorage {
  constructor(private readonly browserStorage: IBrowserStorageParams) {}

  getItem(key: string): Promise<ILayerDTO<{ [key: string]: string }>> {
    return new Promise((resolve) => {
      // dev
      if (!globalThis.whale) {
        const data = window.localStorage.getItem(key)
        resolve(
          new LayerDTO({
            data: { [key]: data }
          })
        )
        return
      }
      this.browserStorage.get([key], (data: { [key: string]: string }) => {
        resolve(
          new LayerDTO({
            data
          })
        )
      })
    })
  }

  setItem(key: string, value: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      // dev
      if (!globalThis.whale) {
        window.localStorage.setItem(key, value)
        resolve(
          new LayerDTO({
            data: true
          })
        )
        return
      }

      const data = {}
      data[key] = value
      this.browserStorage.set(data, () => {
        resolve(
          new LayerDTO({
            data: true
          })
        )
      })
    })
  }

  removeItem(key: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      this.browserStorage.remove(key, () => {
        resolve(
          new LayerDTO({
            data: true
          })
        )
      })
    })
  }

  clear(): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      this.browserStorage.clear(() => {
        resolve(
          new LayerDTO({
            data: true
          })
        )
      })
    })
  }
}
