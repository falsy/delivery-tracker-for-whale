import { useLayoutEffect } from "react"
import { atom, useAtom } from "jotai"
import useDependencies from "./useDependencies"

const carriersAtom = atom([])

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
