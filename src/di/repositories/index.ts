import { IInfrastructure } from "../infrastructures/interfaces"
import { IRepositories } from "./interfaces"
import StorageRepo from "./StorageRepo"

export default (infrastucture: IInfrastructure): IRepositories => {
  return {
    storage: new StorageRepo(infrastucture.storage)
  }
}