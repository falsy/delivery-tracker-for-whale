import controllers from "./controllers"
import infrastructures from "./infrastructures"
import repositories from "./repositories"
import useCases from "./useCases"

const httpClient = globalThis.fetch.bind(globalThis)
const browserStorage = (window as any).whale.storage.local

const infrastructure = infrastructures(httpClient, browserStorage)
const repository = repositories(
  infrastructure.clientHTTP,
  infrastructure.browserStorage
)
const useCase = useCases(repository)
const controller = controllers(useCase)

export default controller
