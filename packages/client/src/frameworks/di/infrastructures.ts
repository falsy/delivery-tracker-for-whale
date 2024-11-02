import ClientHTTP from "@adapters/infrastructures/ClientHTTP"
import BrowserStorage from "@adapters/infrastructures/BrowserStorage"
import WebLocalStorage from "@adapters/infrastructures/WebLocalStorage"
import IInfrastructures from "./interfaces/IInfrastructures"

export default (
  httpClient: (input: RequestInfo, init?: RequestInit) => Promise<Response>
): IInfrastructures => {
  const storage = globalThis.whale
    ? new BrowserStorage(globalThis.whale.storage.local)
    : new WebLocalStorage()

  return {
    clientHTTP: new ClientHTTP(httpClient),
    browserStorage: storage
  }
}
