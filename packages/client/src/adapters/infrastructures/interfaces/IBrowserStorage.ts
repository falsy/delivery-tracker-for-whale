import ILayerDTO from "../../../domains/dtos/interfaces/ILayerDTO"

export interface IBrowserStorageParams {
  get(
    key: string[],
    callback: (result: { [key: string]: string }) => void
  ): void
  set(data: { [key: string]: string }, callback: () => void): void
  clear(callback: () => void): void
  remove(key: string, callback: () => void): void
}

export default interface IBrowserStorage {
  getItem(key: string): Promise<ILayerDTO<{ [key: string]: string }>>
  setItem(key: string, value: string): Promise<ILayerDTO<boolean>>
  removeItem(key: string): Promise<ILayerDTO<boolean>>
  clear(): Promise<ILayerDTO<boolean>>
}
