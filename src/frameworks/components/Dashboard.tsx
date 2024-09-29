import { useState, useEffect, Fragment } from "react"
import styled from "@emotion/styled"

import ITrackerDTO from "../../core/dtos/interfaces/ITrackerDTO"
import ICarrierDTO from "../../core/dtos/interfaces/ICarrierDTO"
import CloseIcon from "./icons/CloseIcon"
import useDependencies from "../hooks/useDependencies"
import TipMessage from "./TipMessage"
import Footer from "./Footer"
import TrackerBox from "./TrackerBox"
import AddTrackerBtn from "./AddTrackerBtn"
import DataMigration from "../services/DataMigration"

const Dashboard = () => {
  const { controllers } = useDependencies()

  const [selectBoxOpenIdx, setSelectBoxOpenIdx] = useState(0)
  const [isErrorMessage, setIsErrorMessage] = useState("")
  const [trackerList, setTrackerList] = useState<ITrackerDTO[]>([])
  const [carrierList, setCarreirList] = useState<ICarrierDTO[]>([])

  const handleClickBody = () => {
    if (selectBoxOpenIdx === 0) return
    setSelectBoxOpenIdx(0)
  }

  const handleClickClearErrorMessage = () => {
    setIsErrorMessage("")
  }

  const showErrorMessage = (message = "error") => {
    setIsErrorMessage(message)
  }

  useEffect(() => {
    getCarrierList()
  }, [])

  const getCarrierList = async () => {
    const { isError, message, data } = await controllers.carrier.getCarriers()
    if (isError) {
      showErrorMessage(message)
      return
    }
    setCarreirList(data)
  }

  useEffect(() => {
    if (carrierList.length === 0) return
    checkDataMigration()
  }, [carrierList])

  const checkDataMigration = async () => {
    const dataMigration = new DataMigration(carrierList)
    await dataMigration.migration()
    getTrackerList()
  }

  const getTrackerList = async () => {
    const { isError, data } = await controllers.tracker.getTrackers()
    if (isError) {
      showErrorMessage()
      return
    }
    setTrackerList(data)
  }

  return (
    <$area onClick={handleClickBody}>
      <$title>택배 배송 조회</$title>
      <$content>
        {isErrorMessage && (
          <$errorMessage>
            <p>
              {isErrorMessage === "error"
                ? "알 수 없는 오류가 발생하였습니다."
                : isErrorMessage}
            </p>
            <div onClick={handleClickClearErrorMessage}>
              <CloseIcon />
            </div>
          </$errorMessage>
        )}
        <$trackerArea>
          {trackerList.map((tracker, i) => {
            const findCarrier = carrierList.find(
              ({ id }) => id == tracker.carrierId
            )
            const carrier = findCarrier ? findCarrier : carrierList[0]
            return (
              <Fragment key={tracker.id}>
                <TrackerBox
                  carrierList={carrierList}
                  carrier={carrier}
                  tracker={tracker}
                  index={i}
                  selectBoxOpenIdx={selectBoxOpenIdx}
                  setSelectBoxOpenIdx={setSelectBoxOpenIdx}
                  getTrackerList={getTrackerList}
                  showErrorMessage={showErrorMessage}
                />
              </Fragment>
            )
          })}
        </$trackerArea>
        <AddTrackerBtn
          getTrackerList={getTrackerList}
          showErrorMessage={showErrorMessage}
        />
        <TipMessage getTrackerList={getTrackerList} />
      </$content>
      <Footer />
    </$area>
  )
}

export default Dashboard

const $area = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const $content = styled.div`
  padding-bottom: 40px;
`

const $title = styled.h1`
  font-size: 16px;
  font-weight: normal;
  background: #fff;
  margin: 0;
  padding: 0 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  color: #000;
  line-height: 49px;
  @media (prefers-color-scheme: dark) {
    background: rgb(55, 55, 55);
    color: #fff;
  }
`

const $errorMessage = styled.div`
  margin: 20px 20px 0;
  padding: 10px 12px 9px;
  background: #ffd4b9;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  white-space: pre-wrap;
  line-height: 18px;
  font-size: 12px;
  color: #444;
  position: relative;
  p {
    margin: 0;
  }
  div {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    padding: 5px;
  }
`

const $trackerArea = styled.section`
  padding: 20px 20px 0;
`
