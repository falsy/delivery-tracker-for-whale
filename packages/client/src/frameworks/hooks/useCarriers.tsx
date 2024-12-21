import { useLayoutEffect } from "react"
import { useAtom } from "jotai"
import useDependencies from "./useDependencies"
import { carriersAtom } from "./atoms/carriersAtom"

export default function useCarriers() {
  const { controllers } = useDependencies()
  const [carriers, setCarriers] = useAtom(carriersAtom)

  useLayoutEffect(() => {
    setCarriers(controllers.carrier.getCachedCarriers())
  }, [])

  return {
    carriers,
    setCarriers
  }
}
