import CarrierUseCase from "../../core/domains/usecases/CarrierUseCase"
import TrackerUseCase from "../../core/domains/usecases/TrackerUseCase"
import IRepositories from "./interfaces/IRepositories"
import IUseCases from "./interfaces/IUseCases"

export default (repository: IRepositories): IUseCases => {
  return {
    carrier: new CarrierUseCase(repository.carrier),
    tracker: new TrackerUseCase(repository.tracker, repository.carrier)
  }
}
