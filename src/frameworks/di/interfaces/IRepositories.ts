import ICarrierRepository from "../../../core/repositories/interfaces/ICarrierRepository"
import ITrackerRepository from "../../../core/repositories/interfaces/ITrackerRepository"

export default interface IRepositories {
  carrier: ICarrierRepository
  tracker: ITrackerRepository
}
