import { IRemote } from "./remote"
import { IWebStorage } from "./webStorage"

export interface IInfrastructure {
  storage: IWebStorage
  remote: IRemote
}