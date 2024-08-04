import LayerDTO from "../../core/dtos/LayerDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import IBrowserStorage from "./interfaces/IBrowserStorage"

export default class BrowserStorage implements IBrowserStorage {
  constructor(
    private readonly browserStorage: {
      get(key: string[], callback: (result: string) => void): void
      set(data: { [key: string]: string }, callback: () => void): void
      clear(callback: () => void): void
      remove(key: string, callback: () => void): void
    }
  ) {}

  getItem(key: string): Promise<ILayerDTO<string | null>> {
    return new Promise(async (resolve) => {
      // // dev
      // if (!(window as any).whale) {
      //   resolve(
      //     new LayerDTO({
      //       data: {
      //         [key]: window.localStorage.getItem(key)
      //       }
      //     } as any)
      //   )
      //   return
      // }
      this.browserStorage.get([key], (data) => {
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
      // // dev
      // if (!(window as any).whale) {
      //   window.localStorage.setItem(key, value)
      //   resolve(
      //     new LayerDTO({
      //       data: true
      //     })
      //   )
      //   return
      // }
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
