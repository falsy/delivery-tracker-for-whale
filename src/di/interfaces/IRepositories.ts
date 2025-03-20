import ICarrierRepository from "@domains/repositories/interfaces/ICarrierRepository"
import ITrackerRepository from "@domains/repositories/interfaces/ITrackerRepository"

export default interface IRepositories {
  carrier: ICarrierRepository
  tracker: ITrackerRepository
}
