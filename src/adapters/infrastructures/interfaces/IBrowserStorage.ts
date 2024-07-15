import ILayerDTO from "../../../core/dtos/interfaces/ILayerDTO"

export default interface IBrowserStorage {
  getItem(key: string): Promise<ILayerDTO<string | null>>
  setItem(key: string, value: string): Promise<ILayerDTO<boolean>>
  removeItem(key: string): Promise<ILayerDTO<boolean>>
  clear(): Promise<ILayerDTO<boolean>>
}
