import { useEffect, lazy, Suspense, useLayoutEffect } from "react"
import { css } from "@styled-system/css"
import Migration from "@services/Migration"
import useCarriers from "@hooks/useCarriers"
import useTrackers from "@hooks/useTrakers"
import Header from "@components/commons/sections/Header"
import Footer from "@components/commons/sections/Footer"
import ErrorMessage from "@containers/commons/boxs/ErrorMessage"

const TrackerSection = lazy(
  () => import("@containers/trackers/sections/TrackerSection")
)
const TipMessage = lazy(() => import("@components/commons/boxs/TipMessage"))

const Dashboard = () => {
  const { carriers, getCarriers, getCachedCarriers, setCarriers } =
    useCarriers()
  const { isPending, getTrackers, clearTrackers } = useTrackers()

  useLayoutEffect(() => {
    const getCacheCarriers = getCachedCarriers()
    setCarriers(getCacheCarriers)
  }, [])

  useEffect(() => {
    getCarriers()
  }, [])

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
      clearTrackers()
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
        <ErrorMessage />
        <div
          className={css({
            opacity: carriers.length === 0 || isPending ? 0 : 1,
            transition: "opacity",
            transitionDuration: "0.3s"
          })}
        >
          {carriers.length > 0 && (
            <Suspense>
              <TrackerSection />
              <TipMessage resetTrackers={handleClickReset} />
            </Suspense>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
