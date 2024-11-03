import ClientHTTP from "@adapters/infrastructures/ClientHTTP"
import BrowserStorage from "@adapters/infrastructures/BrowserStorage"
import WebLocalStorage from "@adapters/infrastructures/WebLocalStorage"
import IInfrastructures from "./interfaces/IInfrastructures"

export default (
  httpClient: (input: RequestInfo, init?: RequestInit) => Promise<Response>
): IInfrastructures => {
  return {
    clientHTTP: new ClientHTTP(httpClient),
    browserStorage: globalThis.whale
      ? new BrowserStorage()
      : new WebLocalStorage()
  }
}
