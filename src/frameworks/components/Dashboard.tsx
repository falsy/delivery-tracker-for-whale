import { useEffect } from "react"
import { css } from "@emotion/react"
import useDependencies from "../hooks/useDependencies"
import { useErrorMessage } from "../hooks/zustands/useErrorMessage"
import useTrackers from "../hooks/useTrackerList"
import { useCarriers } from "../hooks/zustands/useCarriers"
import DataMigration from "../services/DataMigration"
import TipMessage from "./commons/boxs/TipMessage"
import Footer from "./commons/layouts/Footer"
import Header from "./commons/layouts/Header"
import ErrorMessage from "./commons/boxs/ErrorMessage"
import CreateTracker from "./trackers/items/CreateTracker"
import TrackerSection from "./trackers/sections/TrackerSection"

const Dashboard = () => {
  const { controllers } = useDependencies()
  const { setErrMessage } = useErrorMessage()
  const { carriers, setCarriers } = useCarriers()
  const { getTrackerList } = useTrackers()

  useEffect(() => {
    getCarrierList()
  }, [])

  const getCarrierList = async () => {
    const { isError, message, data } = await controllers.carrier.getCarriers()
    if (isError) {
      setErrMessage(message)
      return
    }
    setCarriers(data)
  }

  useEffect(() => {
    if (carriers.length === 0) return
    checkDataMigration()
  }, [carriers])

  const checkDataMigration = async () => {
    const dataMigration = new DataMigration(carriers)
    await dataMigration.migration()
    getTrackerList()
  }

  return (
    <>
      <Header />
      <main
        css={css`
          padding-bottom: 40px;
        `}
      >
        <ErrorMessage />
        <TrackerSection />
        <CreateTracker />
        <TipMessage />
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
