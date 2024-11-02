import { createContext, ReactNode } from "react"
import controllersFn from "@di/controllers"
import infrastructuresFn from "@di/infrastructures"
import repositoriesFn from "@di/repositories"
import useCasesFn from "@di/useCases"

interface Dependencies {
  controllers: ReturnType<typeof controllersFn>
}

export const DependencyContext = createContext<Dependencies | null>(null)

export default function DependencyProvider({
  children
}: {
  children: ReactNode
}) {
  const httpClient = globalThis.fetch.bind(globalThis)
  const browserStorage = globalThis.whale
    ? globalThis.whale.storage.local
    : globalThis.localStorage // dev

  const infrastructures = infrastructuresFn(httpClient, browserStorage)
  const repositories = repositoriesFn(
    infrastructures.clientHTTP,
    infrastructures.browserStorage
  )
  const useCases = useCasesFn(repositories)
  const controllers = controllersFn(useCases)

  const dependencies = {
    controllers
  }

  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  )
}
