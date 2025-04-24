import { useEffect, useLayoutEffect, useCallback, useRef } from "react"
import Migration from "@services/Migration"
import useCarriers from "@hooks/useCarriers"
import useTrackers from "@hooks/useTrackers"
import Header from "@components/atoms/Header"
import Footer from "@components/atoms/Footer"
import ErrorMessageBox from "@components/molecules/ErrorMessageBox"
import TrackerSection from "@components/templates/TrackerSection"
import TipMessageBox from "@components/molecules/TipMessageBox"

const Dashboard = () => {
  const { isPending: isCPending, carriers, getCarriers } = useCarriers()
  const { isPending: isTPending, getTrackers, clearTrackers } = useTrackers()

  const isLoading = carriers.length === 0 || isCPending || isTPending

  const getCarriersRef = useRef(getCarriers)
  const getTrackersRef = useRef(getTrackers)

  useLayoutEffect(() => {
    getCarriersRef.current()
  }, [])

  const checkDataMigration = useCallback(async () => {
    await new Migration(carriers).migration()
    getTrackersRef.current()
  }, [carriers])

  useEffect(() => {
    if (carriers.length === 0) return
    checkDataMigration()
  }, [carriers, checkDataMigration])

  const handleClickReset = async () => {
    if (
      window.confirm(
        "초기화하면 기존에 저장된 모든 운송장 번호가 삭제됩니다.\n미리 다른곳에 메모해 주세요."
      )
    ) {
      clearTrackers()
    }
  }

  return (
    <>
      <Header title={"택배 배송 조회"} />
      <main className="pb-10">
        <ErrorMessageBox />
        <div
          className={`transition-opacity duration-150 ${isLoading ? "opacity-0" : "opacity-100"}`}
        >
          {carriers.length > 0 && (
            <>
              <TrackerSection />
              <TipMessageBox resetTrackers={handleClickReset} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
