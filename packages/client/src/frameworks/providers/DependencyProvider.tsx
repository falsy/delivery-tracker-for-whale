import controllersFn from "@di/index"
import { createContext, ReactNode } from "react"

interface Dependencies {
  controllers: ReturnType<typeof controllersFn>
}

export const DependencyContext = createContext<Dependencies | null>(null)

export default function DependencyProvider({
  children
}: {
  children: ReactNode
}) {
  const controllers = controllersFn()

  const dependencies = {
    controllers
  }

  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  )
}
