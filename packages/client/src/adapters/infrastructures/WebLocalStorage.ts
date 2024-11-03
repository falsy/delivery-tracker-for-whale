import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import LayerDTO from "../dtos/LayerDTO"
import IBrowserStorage from "./interfaces/IBrowserStorage"

export default class WebLocalStorage implements IBrowserStorage {
  private readonly storage: Storage = globalThis.localStorage

  getItem(key: string): Promise<ILayerDTO<{ [key: string]: string }>> {
    return new Promise((resolve, reject) => {
      try {
        const data = this.storage.getItem(key)
        resolve(
          new LayerDTO({
            data: { [key]: data }
          })
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  setItem(key: string, value: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve, reject) => {
      try {
        this.storage.setItem(key, value)
        resolve(
          new LayerDTO({
            data: true
          })
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  removeItem(key: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve, reject) => {
      try {
        this.storage.removeItem(key)
        resolve(
          new LayerDTO({
            data: true
          })
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  clear(): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve, reject) => {
      try {
        this.storage.clear()
        resolve(
          new LayerDTO({
            data: true
          })
        )
      } catch (error) {
        reject(error)
      }
    })
  }
}
