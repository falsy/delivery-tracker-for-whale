import infrastructuresFn from "./infrastructures"
import repositoriesFn from "./repositories"
import useCasesFn from "./useCases"
import controllersFn from "./controllers"

export default function controllers() {
  const httpClient = globalThis.fetch.bind(globalThis)
  const infrastructures = infrastructuresFn(httpClient)
  const repositories = repositoriesFn(
    infrastructures.clientHTTP,
    infrastructures.browserStorage
  )
  const useCases = useCasesFn(repositories)
  const controllers = controllersFn(useCases)

  return controllers
}
