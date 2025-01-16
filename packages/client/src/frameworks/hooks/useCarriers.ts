import { useCallback, useMemo, useTransition } from "react"
import { atom, useAtom } from "jotai"
import di from "@di/index"
import useError from "./useError"

const carriersAtom = atom([])

export default function useCarriers() {
  const controllers = useMemo(() => di(), [])
  const { setMessage } = useError()
  const [carriers, setCarriers] = useAtom(carriersAtom)
  const [isPending, startTransition] = useTransition()

  const getCachedCarriers = useCallback(() => {
    return controllers.carrier.getCachedCarriers()
  }, [controllers.carrier])

  const getCarriers = useCallback(async () => {
    startTransition(async () => {
      const cachedCarriers = getCachedCarriers()
      setCarriers(cachedCarriers)

      const { isError, message, data } = await controllers.carrier.getCarriers()
      if (isError) {
        setMessage(message)
        return
      }

      if (
        cachedCarriers.length > 0 &&
        JSON.stringify(cachedCarriers) === JSON.stringify(data)
      ) {
        return
      }

      setCarriers(data)
    })
  }, [setMessage, controllers.carrier, setCarriers])

  return {
    isPending,
    carriers,
    getCarriers,
    getCachedCarriers,
    setCarriers
  }
}
