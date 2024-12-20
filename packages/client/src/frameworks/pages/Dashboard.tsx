import { useEffect, useState, lazy } from "react"
import { css } from "@styled-system/css"
import ITracker from "@domains/entities/interfaces/ITracker"
import Migration from "@services/Migration"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useCarriers from "@hooks/useCarriers"
import Header from "@components/commons/sections/Header"
import Footer from "@components/commons/sections/Footer"
import Loading from "@components/commons/items/Loading"
import ErrorMessage from "@containers/commons/boxs/ErrorMessage"

const TrackerSection = lazy(() => import("@containers/sections/TrackerSection"))
const TipMessage = lazy(() => import("@components/commons/boxs/TipMessage"))

const Dashboard = () => {
  const { controllers } = useDependencies()
  const { setMessage } = useError()
  const { carriers, setCarriers } = useCarriers()

  const [isLoading, setLoading] = useState(true)
  const [trackers, setTrackers] = useState<ITracker[]>([])

  useEffect(() => {
    getCarrierList()
  }, [])

  const getCarrierList = async () => {
    const { isError, message, data } = await controllers.carrier.getCarriers()
    if (isError) {
      setMessage(message)
      setLoading(false)
      return
    }
    setCarriers(data)
  }

  const getTrackers = async () => {
    const { isError, data } = await controllers.tracker.getTrackers()
    if (isError) {
      setMessage()
      setLoading(false)
      return
    }
    setTrackers(data)
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }

  useEffect(() => {
    if (carriers.length === 0) return
    checkDataMigration()
  }, [carriers])

  const checkDataMigration = async () => {
    await new Migration(carriers).migration()
    getTrackers()
  }

  const handleClickReset = async () => {
    if (
      window.confirm(
        "초기화하면 기존에 저장된 모든 운송장 번호가 삭제됩니다.\n미리 다른곳에 메모해 주세요."
      )
    ) {
      const { isError } = await controllers.tracker.clearTrackers()
      if (isError) {
        setMessage()
        return
      }
      setTrackers([])
    }
  }

  return (
    <>
      <Header />
      <main
        className={css({
          position: "relative",
          paddingBottom: "40px"
        })}
      >
        {isLoading && (
          <div
            className={css({
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%"
            })}
          >
            <Loading />
          </div>
        )}
        <ErrorMessage />
        <div
          className={css({
            opacity: isLoading ? 0 : 1,
            transition: "opacity",
            transitionDuration: "0.5s"
          })}
        >
          {carriers.length > 0 && !isLoading && (
            <>
              <TrackerSection trackers={trackers} getTrackers={getTrackers} />
              <TipMessage resetTrackers={handleClickReset} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
