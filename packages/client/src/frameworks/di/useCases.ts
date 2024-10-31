import CarrierUseCase from "../../domains/useCases/CarrierUseCase"
import TrackerUseCase from "../../domains/useCases/TrackerUseCase"
import IRepositories from "./interfaces/IRepositories"
import IUseCases from "./interfaces/IUseCases"

export default (repository: IRepositories): IUseCases => {
  return {
    carrier: new CarrierUseCase(repository.carrier),
    tracker: new TrackerUseCase(repository.tracker, repository.carrier)
  }
}
