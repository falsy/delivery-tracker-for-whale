import { useEffect } from "react"
import { css } from "@emotion/react"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import useCarriers from "@hooks/useCarriers"
import Migration from "@services/Migration"
import TrackerSection from "@containers/sections/TrackerSection"
import Header from "@components/commons/sections/Header"
import TipMessage from "@containers/commons/boxs/TipMessage"
import Footer from "@components/commons/sections/Footer"

const Dashboard = () => {
  const { controllers } = useDependencies()
  const { setMessage } = useError()
  const { carriers, setCarriers } = useCarriers()
  const { getTrackers } = useTrackers()

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

  useEffect(() => {
    if (carriers.length === 0) return
    checkDataMigration()
  }, [carriers])

  const checkDataMigration = async () => {
    await new Migration(carriers).migration()
    getTrackers()
  }

  return (
    <>
      <Header />
      <main
        css={css`
          padding-bottom: 40px;
        `}
      >
        <TrackerSection />
        <TipMessage />
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
