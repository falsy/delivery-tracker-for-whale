import { useEffect, useState } from "react"
import styled from "@emotion/styled"

import ICarrierDTO from "../../core/dtos/interfaces/ICarrierDTO"
import ITrackerDTO from "../../core/dtos/interfaces/ITrackerDTO"
import CloseIcon from "./icons/CloseIcon"
import PlusIcon from "./icons/PlusIcon"
import ArrowDownIcon from "./icons/ArrowDownIcon"
import TrackerState from "./TrackerState"
import ctrl from "../di"

interface IProps {
  carrierList: ICarrierDTO[]
  carrier: ICarrierDTO
  tracker: ITrackerDTO
  index: number
  selectBoxOpenIdx: number
  setSelectBoxOpenIdx(selectBoxOpenIdx: number): void
  getTrackerList(): void
  showErrorMessage(): void
}

const TrackerBox = ({
  carrierList,
  carrier,
  tracker,
  index,
  selectBoxOpenIdx,
  setSelectBoxOpenIdx,
  getTrackerList,
  showErrorMessage
}: IProps) => {
  const [isTrackerState, setTrackerState] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState(tracker.trackingNumber)
  const [label, setLabel] = useState(tracker.label)
  const [memos, setMemos] = useState(tracker.memos)

  useEffect(() => {
    if (memos.length !== tracker.memos.length) {
      setMemos(tracker.memos)
    }
  }, [tracker.memos])

  const handleChangeLabel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cacheLabel = label
    const newLabel = e.target.value
    setLabel(newLabel)
    const { isError } = await ctrl.tracker.updateLabel(tracker, newLabel)
    if (isError) {
      showErrorMessage()
      setLabel(cacheLabel)
      return
    }
  }

  const handleChangeTrackingNumber = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cacheNumber = trackingNumber
    const newNumber = e.target.value
    setTrackingNumber(newNumber)
    const { isError } = await ctrl.tracker.updateTrackingNumber(
      tracker,
      newNumber
    )
    if (isError) {
      showErrorMessage()
      setTrackingNumber(cacheNumber)
      return
    }
  }

  const handleClickDeleteTracker = async (id: string) => {
    const { isError } = await ctrl.tracker.deleteTracker(id)
    if (isError) {
      showErrorMessage()
      return
    }
    getTrackerList()
  }

  const handleClickOpenSelectBox = (idx: number) => {
    setSelectBoxOpenIdx(selectBoxOpenIdx === idx + 1 ? 0 : idx + 1)
  }

  const handleClickSelect = async (carrierId: string) => {
    const { isError } = await ctrl.tracker.updateCarrierId(tracker, carrierId)
    if (isError) {
      showErrorMessage()
      return
    }
    getTrackerList()
  }

  const handleClickNewWindowTracker = (carrier: ICarrierDTO) => {
    const { popupURL } = carrier

    window.open(
      popupURL + trackingNumber,
      "",
      "resizable=yes,scrollbars=yes,width=720,height=600"
    )
  }

  const handleClickInlineTracker = () => {
    if (trackingNumber === "") {
      return
    }
    setTrackerState(false)
    setTimeout(() => setTrackerState(true), 0)
  }

  const handleClickCloseTracker = () => {
    setTrackerState(false)
  }

  const handleClickAddMemo = async (tracker: ITrackerDTO) => {
    const { isError } = await ctrl.tracker.addMemo(tracker)
    if (isError) {
      showErrorMessage()
      return
    }
    getTrackerList()
  }

  const handleDeleteMemo = async (idx: number) => {
    const { isError } = await ctrl.tracker.deleteMemo(tracker, idx)
    if (isError) {
      showErrorMessage()
      return
    }
    getTrackerList()
  }

  const handleChangeMemo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const cacheMemos = memos.map((memo) => memo)
    const newMemos = memos.map((memo) => memo)
    const newMemo = e.target.value
    newMemos[idx] = newMemo
    setMemos(newMemos)
    const { isError } = await ctrl.tracker.updateMemo(tracker, idx, newMemo)
    if (isError) {
      showErrorMessage()
      setMemos(cacheMemos)
      return
    }
  }

  return (
    <$trackerBox key={tracker.id}>
      <$deleteBtn onClick={() => handleClickDeleteTracker(tracker.id)}>
        <CloseIcon />
      </$deleteBtn>
      <$labelArea>
        <$addLabel onClick={() => handleClickAddMemo(tracker)}>
          <PlusIcon />
        </$addLabel>
        <$labelInput
          type="text"
          value={label}
          onChange={(e) => handleChangeLabel(e)}
          placeholder="이곳에 배송에 대한 간단한 메모를 적을 수 있어요."
        />
      </$labelArea>
      {memos.length > 0 && (
        <$memoBox>
          <ul>
            {memos.map((memo, i) => {
              return (
                <li key={"memo" + index + i}>
                  <div>
                    <$memoInput
                      type="text"
                      value={memo}
                      onChange={(e) => {
                        handleChangeMemo(e, i)
                      }}
                      placeholder="이곳에 추가적인 메모를 입력할 수 있어요."
                    />
                    <$closeMemo onClick={() => handleDeleteMemo(i)}>
                      <CloseIcon />
                    </$closeMemo>
                  </div>
                </li>
              )
            })}
          </ul>
        </$memoBox>
      )}
      <$selectArea>
        <$selectTitle onClick={() => handleClickOpenSelectBox(index)}>
          {carrier.displayName}
          <$selectArrow>
            <ArrowDownIcon />
          </$selectArrow>
        </$selectTitle>
        <$selectBox isShow={selectBoxOpenIdx === index + 1}>
          {carrierList.map((carrier) => (
            <$selectList
              key={carrier.id}
              onClick={() => handleClickSelect(carrier.id)}
            >
              {carrier.displayName}
            </$selectList>
          ))}
        </$selectBox>
      </$selectArea>
      <$codeBox>
        <$codeInput
          type="text"
          value={trackingNumber}
          onChange={(e) => handleChangeTrackingNumber(e)}
          placeholder="운송장 번호를 입력해주세요."
        />
        {carrier.isPopupEnabled && (
          <$codeSumbitBtn
            onClick={() => handleClickNewWindowTracker(carrier)}
            isWindow={true}
          >
            새창
          </$codeSumbitBtn>
        )}
        {carrier.isCrawlable && (
          <$codeSumbitBtn onClick={() => handleClickInlineTracker()}>
            조회
          </$codeSumbitBtn>
        )}
      </$codeBox>
      {isTrackerState && (
        <TrackerState
          carrierId={carrier.id}
          trackerTrackingNumber={trackingNumber}
          closeFnc={handleClickCloseTracker}
        />
      )}
    </$trackerBox>
  )
}

export default TrackerBox

const $trackerBox = styled.div`
  position: relative;
  padding: 20px 20px 0;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    & > span {
      opacity: 1;
    }
  }

  @media (prefers-color-scheme: dark) {
    background: rgb(55, 55, 55);
  }
`

const $deleteBtn = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  line-height: 0;
  width: 26px;
  height: 26px;
  text-align: center;
  border-radius: 20px;
  background: #fff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: opacity 0.3s;
  font-size: 18px;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (prefers-color-scheme: dark) {
    background: rgb(160, 160, 160);
  }
`

const $labelArea = styled.div`
  display: flex;
`

const $addLabel = styled.div`
  width: 28px;
  svg {
    margin-top: 2px;
    width: 16px;
    height: auto;
    cursor: pointer;
    stroke: #05c38b;
  }
`

const $memoInput = styled.input`
  flex-grow: 1;
  line-height: 20px;
  margin: 0 0 5px;
  width: 100%;
  font-size: 13px;
  padding: 0 2px;
  border: 0;
  outline: none;
  background: transparent;

  @media (prefers-color-scheme: dark) {
    color: #bbb;
  }
`

const $labelInput = styled.input`
  flex-grow: 1;
  line-height: 20px;
  margin: 0 0 10px;
  width: 100%;
  font-size: 13px;
  padding: 0 2px;
  border: 0;
  outline: none;
  background: transparent;

  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`

const $memoBox = styled.div`
  padding-bottom: 5px;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      div {
        display: flex;
      }
    }
  }
`

const $closeMemo = styled.div`
  cursor: pointer;
  svg {
    margin-top: 1px;
    opacity: 0.5;
  }

  @media (prefers-color-scheme: dark) {
    svg {
      stroke: #eee;
    }
  }
`

const $selectArea = styled.div`
  position: relative;
  padding-bottom: 10px;
`

const $selectTitle = styled.p`
  margin: 0;
  line-height: 40px;
  padding: 0 15px;
  border: 1px solid #ddd;
  cursor: pointer;

  @media (prefers-color-scheme: dark) {
    border-color: rgb(85, 85, 85);
    color: #fff;
  }
`

const $selectArrow = styled.span`
  position: absolute;
  right: 15px;
  top: 13px;
  line-height: 0;
  svg {
    width: 16px;
    height: auto;
  }
`

const $selectBox = styled.ul<{ isShow: boolean }>`
  position: absolute;
  width: 100%;
  padding: 0;
  line-height: 35px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  margin-top: 0;
  list-style: none;
  background: #f9f9f9;
  z-index: 100;
  max-height: 240px;
  overflow-y: scroll;
  border-bottom: 1px solid #ddd;
  display: none;
  ${(props) => props.isShow && "display: block;"}

  @media (prefers-color-scheme: dark) {
    // background: rgb(55, 55, 55);
    // background: rgb(41, 41, 41);
    border-color: rgb(85, 85, 85);
    color: #fff;
  }
`

const $selectList = styled.li`
  padding: 0 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background: #fff;
  }
  &:last-child {
    border-bottom: 0;
  }

  @media (prefers-color-scheme: dark) {
    // background: rgb(55, 55, 55);
    background: rgb(55, 55, 55);
    border-color: rgb(85, 85, 85);
    &:hover {
      background: rgb(65, 65, 65);
    }
  }
`

const $codeBox = styled.div`
  padding-bottom: 20px;
  display: flex;
`

const $codeInput = styled.input`
  flex-grow: 1;
  width: 100%;
  line-height: 24px;
  margin: 0;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-right: 0;
  font-size: 15px;
  outline: none;
  letter-spacing: 0.3px;

  &::placeholder {
    font-size: 13px;
  }

  @media (prefers-color-scheme: dark) {
    background: rgb(55, 55, 55);
    border-color: rgb(85, 85, 85);
    color: #fff;
  }
`

const $codeSumbitBtn = styled.button<{ isWindow?: boolean }>`
  border: 1px solid #05c38b;
  line-height: 40px;
  padding: 0;
  background: #00dc9b;
  color: #fff;
  width: 30%;
  min-width: 60px;
  font-size: 14px;
  cursor: pointer;
  text-shadow: 0px 0px 1px #075c43;
  letter-spacing: 1px;
  font-weight: 700;
  ${(props) =>
    props.isWindow &&
    `
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-right: 0;
    border-top-color: rgb(220, 220, 220);
    border-bottom-color: rgb(220, 220, 220);
    text-shadow: none;
    color: #000;
    font-weight: 500;
    &:last-of-type {
      border-right: 1px solid rgb(220, 220, 220);
    }
    &:hover {
      background: #eaeaea;
    }
    @media (prefers-color-scheme: dark) {
      background: rgb(44, 44, 44);
      color: #ddd;
      border-color: rgb(85, 85, 85);
      border-right: 0;
      border-top-color: rgb(50, 50, 50);
      border-bottom-color: rgb(50, 50, 50);
      &:last-of-type {
        border-right: 1px solid rgb(50, 50, 50);
      }
      &:hover {
        background: rgb(30, 30, 30);
      }
    }

  `}
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`
