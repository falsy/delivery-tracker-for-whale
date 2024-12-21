import IBrowserStorage from "@adapters/infrastructures/interfaces/IBrowserStorage"
import IClientHTTP from "@adapters/infrastructures/interfaces/IClientHTTP"
import ICacheWebStorage from "@adapters/infrastructures/interfaces/ICacheWebStorage"
import IETagManager from "@services/interfaces/IETagManager"
import IRepositories from "./interfaces/IRepositories"
import CarrierRepository from "@adapters/repositories/CarrierRepository"
import TrackerRepository from "@adapters/repositories/TrackerRepository"

export default (
  clientHTTP: IClientHTTP,
  browserStorage: IBrowserStorage,
  cacheWebStorage: ICacheWebStorage,
  etagManager: IETagManager
): IRepositories => {
  return {
    carrier: new CarrierRepository(clientHTTP, cacheWebStorage, etagManager),
    tracker: new TrackerRepository(clientHTTP, browserStorage, etagManager)
  }
}
