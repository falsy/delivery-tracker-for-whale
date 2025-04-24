import { useCallback, useMemo, useState, useTransition } from "react"
import { atom, useAtom } from "jotai"
import { ITrackerProps } from "@domains/dtos/interfaces/ITrackerDTO"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import IDeliveryDTO from "@domains/dtos/interfaces/IDeliveryDTO"
import di from "@di/index"
import useError from "./useError"

const trakersAtom = atom([])

export default function useTrackers() {
  const controllers = useMemo(() => di(), [])
  const [isPending, startTransition] = useTransition()

  const { setMessage } = useError()
  const [trackers, setTrackers] = useAtom(trakersAtom)

  const [deliveryErrorMessage, setDeliveryErrorMessage] = useState("")
  const [delivery, setDelivery] = useState<IDeliveryDTO>(null)

  const getTrackers = useCallback(async () => {
    startTransition(async () => {
      const { isError, message, data } = await controllers.tracker.getTrackers()
      if (isError) {
        setMessage(message)
        return
      }
      setTrackers(data)
    })
  }, [setMessage, controllers.tracker, setTrackers])

  const clearTrackers = useCallback(async () => {
    const { isError, message } = await controllers.tracker.clearTrackers()
    if (isError) {
      setMessage(message)
      return
    }
    setTrackers([])
  }, [setMessage, controllers.tracker, setTrackers])

  const createTracker = useCallback(async () => {
    const { isError, message } = await controllers.tracker.createTracker()
    if (isError) {
      setMessage(message)
      return
    }
    getTrackers()
  }, [setMessage, controllers.tracker, getTrackers])

  const deleteTracker = useCallback(
    async (id: string) => {
      if (!window.confirm("조회 정보를 삭제하시겠습니까?")) return
      const { isError, message } = await controllers.tracker.deleteTracker(id)
      if (isError) {
        setMessage(message)
        return
      }
      getTrackers()
    },
    [setMessage, controllers.tracker, getTrackers]
  )

  const patchTracker = useCallback(
    async (id: string, trackerProps: ITrackerProps) => {
      const { isError } = await controllers.tracker.patchTracker(
        id,
        trackerProps
      )
      if (isError) {
        setMessage("자동 저장에 실패하였습니다.")
        return
      }
    },
    [setMessage, controllers.tracker]
  )

  const getDelivery = useCallback(
    async (carrier: ICarrier, trackingNumber: string) => {
      setDeliveryErrorMessage("")
      startTransition(async () => {
        const { isError, message, data } =
          await controllers.tracker.getDelivery(carrier, trackingNumber)

        if (isError) {
          setDeliveryErrorMessage(message)
          return
        }
        setDelivery(data)
      })
    },
    [controllers.tracker]
  )

  const clearDelivery = useCallback(() => {
    setDelivery(null)
    setDeliveryErrorMessage("")
  }, [setDelivery])

  return {
    isPending,
    trackers,
    getTrackers,
    clearTrackers,
    createTracker,
    deleteTracker,
    patchTracker,
    delivery,
    deliveryErrorMessage,
    getDelivery,
    clearDelivery
  }
}
