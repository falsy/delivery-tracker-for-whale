import { useEffect, useState } from "react"
import { css } from "@emotion/react"
import ITracker from "@domains/entities/interfaces/ITracker"
import Migration from "@services/Migration"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useCarriers from "@hooks/useCarriers"
import TrackerSection from "@containers/sections/TrackerSection"
import Header from "@components/commons/sections/Header"
import TipMessage from "@components/commons/boxs/TipMessage"
import Footer from "@components/commons/sections/Footer"

const Dashboard = () => {
  const { controllers } = useDependencies()
  const { setMessage } = useError()
  const { carriers, setCarriers } = useCarriers()

  const [trackers, setTrackers] = useState<ITracker[]>([])

  useEffect(() => {
    getCarrierList()
  }, [])

  const getCarrierList = async () => {
    const { isError, message, data } = await controllers.carrier.getCarriers()
    if (isError) {
      setMessage(message)
      return
    }
    setCarriers(data)
  }

  const getTrackers = async () => {
    const { isError, data } = await controllers.tracker.getTrackers()
    if (isError) {
      setMessage()
      return []
    }
    setTrackers(data)
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
        css={css`
          padding-bottom: 40px;
        `}
      >
        <TrackerSection trackers={trackers} getTrackers={getTrackers} />
        <TipMessage resetTrackers={handleClickReset} />
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
