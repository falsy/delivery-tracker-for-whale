import IBrowserStorage from "@adapters/infrastructures/interfaces/IBrowserStorage"
import ICacheWebStorage from "@adapters/infrastructures/interfaces/ICacheWebStorage"
import IClientHTTP from "@adapters/infrastructures/interfaces/IClientHTTP"

export default interface IInfrastructures {
  clientHTTP: IClientHTTP
  browserStorage: IBrowserStorage
  cacheWebStorage: ICacheWebStorage
}
