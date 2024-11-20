import ETagManager from "@services/ETagManager"
import infrastructuresFn from "./infrastructures"
import repositoriesFn from "./repositories"
import useCasesFn from "./useCases"
import controllersFn from "./controllers"

export default function controllers() {
  const httpClient = globalThis.fetch.bind(globalThis)
  const infrastructures = infrastructuresFn(httpClient)
  const etagManager = new ETagManager()
  const repositories = repositoriesFn(
    infrastructures.clientHTTP,
    infrastructures.browserStorage,
    etagManager
  )
  const useCases = useCasesFn(repositories)
  const controllers = controllersFn(useCases)

  return controllers
}
