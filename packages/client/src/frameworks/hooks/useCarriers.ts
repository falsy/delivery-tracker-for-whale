import { useCallback, useMemo } from "react"
import { atom, useAtom } from "jotai"
import di from "@di/index"
import useError from "./useError"

const carriersAtom = atom([])

export default function useCarriers() {
  const controllers = useMemo(() => di(), [])
  const { setMessage } = useError()
  const [carriers, setCarriers] = useAtom(carriersAtom)

  const getCachedCarriers = useCallback(() => {
    return controllers.carrier.getCachedCarriers()
  }, [controllers.carrier])

  const getCarriers = useCallback(async () => {
    const { isError, message, data } = await controllers.carrier.getCarriers()
    if (isError) {
      setMessage(message)
      return
    }
    setCarriers(data)
  }, [setMessage, controllers.carrier, setCarriers])

  return {
    carriers,
    getCarriers,
    getCachedCarriers,
    setCarriers
  }
}
