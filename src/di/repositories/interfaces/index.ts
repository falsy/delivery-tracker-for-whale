import { IRemoteRepo } from "./remoteRepo"
import { IStorageRepo } from "./storageRepo"

export interface IRepositories {
  storage: IStorageRepo
  remote: IRemoteRepo
}