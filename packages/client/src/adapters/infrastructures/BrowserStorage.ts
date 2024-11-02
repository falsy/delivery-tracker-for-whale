import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import LayerDTO from "../dtos/LayerDTO"
import IBrowserStorage, {
  IBrowserStorageParams
} from "./interfaces/IBrowserStorage"

export default class BrowserStorage implements IBrowserStorage {
  constructor(private readonly browserStorage: IBrowserStorageParams) {}

  getItem(key: string): Promise<ILayerDTO<{ [key: string]: string }>> {
    return new Promise((resolve) => {
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
