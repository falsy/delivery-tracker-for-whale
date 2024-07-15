import ICarrierUseCase from "../../../core/domains/usecases/interfaces/ICarrierUseCase"
import ITrackerUseCase from "../../../core/domains/usecases/interfaces/ITrackerUseCase"

export default interface IUseCases {
  carrier: ICarrierUseCase
  tracker: ITrackerUseCase
}
