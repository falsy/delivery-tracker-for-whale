import IBrowserStorage from "@adapters/infrastructures/interfaces/IBrowserStorage"
import IClientHTTP from "@adapters/infrastructures/interfaces/IClientHTTP"
import CarrierRepository from "@adapters/repositories/CarrierRepository"
import TrackerRepository from "@adapters/repositories/TrackerRepository"
import IETagManager from "@services/interfaces/IETagManager"
import IRepositories from "./interfaces/IRepositories"

export default (
  clientHTTP: IClientHTTP,
  browserStorage: IBrowserStorage,
  etagManager: IETagManager
): IRepositories => {
  return {
    carrier: new CarrierRepository(clientHTTP, etagManager),
    tracker: new TrackerRepository(clientHTTP, browserStorage, etagManager)
  }
}
