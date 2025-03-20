import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import LayerDTO from "../dtos/LayerDTO"
import IBrowserStorage, {
  IBrowserRuntime,
  IBrowserStorageParams
} from "./interfaces/IBrowserStorage"

export default class BrowserStorage implements IBrowserStorage {
  private readonly runtime = globalThis.whale.runtime as IBrowserRuntime
  private readonly storage = globalThis.whale.storage
    .local as IBrowserStorageParams

  getItem(key: string): Promise<ILayerDTO<{ [key: string]: string }>> {
    return new Promise((resolve, reject) => {
      try {
        this.storage.get([key], (data: { [key: string]: string }) => {
          if (this.runtime.lastError) {
            reject(this.runtime.lastError)
          } else {
            resolve(
              new LayerDTO({
                data
              })
            )
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  setItem(key: string, value: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve, reject) => {
      try {
        const data = {}
        data[key] = value
        this.storage.set(data, () => {
          if (this.runtime.lastError) {
            reject(this.runtime.lastError)
          } else {
            resolve(
              new LayerDTO({
                data: true
              })
            )
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  removeItem(key: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve, reject) => {
      try {
        this.storage.remove(key, () => {
          if (this.runtime.lastError) {
            reject(this.runtime.lastError)
          } else {
            resolve(
              new LayerDTO({
                data: true
              })
            )
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  clear(): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve, reject) => {
      try {
        this.storage.clear(() => {
          if (this.runtime.lastError) {
            reject(this.runtime.lastError)
          } else {
            resolve(
              new LayerDTO({
                data: true
              })
            )
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
