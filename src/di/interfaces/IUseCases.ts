import ICarrierUseCase from "@domains/useCases/interfaces/ICarrierUseCase"
import ITrackerUseCase from "@domains/useCases/interfaces/ITrackerUseCase"

export default interface IUseCases {
  carrier: ICarrierUseCase
  tracker: ITrackerUseCase
}
