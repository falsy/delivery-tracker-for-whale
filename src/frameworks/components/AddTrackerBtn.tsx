import styled from "@emotion/styled"

import ctrl from "../di"

interface IPorps {
  getTrackerList(): void
  showErrorMessage(): void
}

const AddTrackerBtn = ({ getTrackerList, showErrorMessage }: IPorps) => {
  const handleClickAddDelivery = async () => {
    const { isError } = await ctrl.tracker.addTracker()
    if (isError) {
      showErrorMessage()
      return
    }
    getTrackerList()
  }

  return (
    <$addBtnArea>
      <$addBtn onClick={handleClickAddDelivery}>추가</$addBtn>
    </$addBtnArea>
  )
}

export default AddTrackerBtn

const $addBtnArea = styled.section`
  padding: 0 20px 40px;
`

const $addBtn = styled.button`
  display: inline-block;
  width: 80px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  background: #00dc9b;
  border: 1px solid #05c38b;
  cursor: pointer;
  text-shadow: 0px 0px 1px #075c43;
  letter-spacing: 1px;
  font-weight: 700;
  opacity: 1;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.8;
  }
`
