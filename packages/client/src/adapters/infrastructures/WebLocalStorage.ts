import ILayerDTO from "@domains/dtos/interfaces/ILayerDTO"
import LayerDTO from "../dtos/LayerDTO"
import IBrowserStorage from "./interfaces/IBrowserStorage"

export default class WebLocalStorage implements IBrowserStorage {
  getItem(key: string): Promise<ILayerDTO<{ [key: string]: string }>> {
    return new Promise((resolve) => {
      const data = window.localStorage.getItem(key)
      resolve(
        new LayerDTO({
          data: { [key]: data }
        })
      )
    })
  }

  setItem(key: string, value: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      window.localStorage.setItem(key, value)
      resolve(
        new LayerDTO({
          data: true
        })
      )
    })
  }

  removeItem(key: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      window.localStorage.removeItem(key)
      resolve(
        new LayerDTO({
          data: true
        })
      )
    })
  }

  clear(): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      window.localStorage.clear()
      resolve(
        new LayerDTO({
          data: true
        })
      )
    })
  }
}
