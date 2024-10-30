import BrowserStorage from "../../adapters/infrastructures/BrowserStorage"
import ClientHTTP from "../../adapters/infrastructures/ClientHTTP"
import { IBrowserStorageParams } from "../../adapters/infrastructures/interfaces/IBrowserStorage"
import IInfrastructures from "./interfaces/IInfrastructures"

export default (
  httpClient: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  browserStorage: IBrowserStorageParams
): IInfrastructures => {
  return {
    clientHTTP: new ClientHTTP(httpClient),
    browserStorage: new BrowserStorage(browserStorage)
  }
}
