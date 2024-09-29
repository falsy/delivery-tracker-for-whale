import styled from "@emotion/styled"
import useDependencies from "../hooks/useDependencies"

interface IProps {
  getTrackerList(): void
}

const TipMessage = ({ getTrackerList }: IProps) => {
  const { controllers } = useDependencies()

  const handleClickReset = async () => {
    if (
      window.confirm(
        "초기화하면 기존의 저정된 모든 운송장 번호가 삭제됩니다.\n미리 다른곳에 메모해 주세요."
      )
    ) {
      const { isError: isClearError } =
        await controllers.tracker.clearTrackers()
      if (isClearError) return
      const { isError: isAddError } = await controllers.tracker.addTracker()
      if (isAddError) return
      getTrackerList()
    }
  }

  return (
    <$tipMessageArea>
      <p>
        서비스가 정상 동작하지 않을 경우 아래의 <strong>[초기화]</strong>를
        진행해 주세요.
        <br />
        <span onClick={handleClickReset}>[초기화]</span>
      </p>
    </$tipMessageArea>
  )
}

export default TipMessage

const $tipMessageArea = styled.section`
  padding: 0 20px;
  font-size: 12px;
  color: #444;

  @media (prefers-color-scheme: dark) {
    color: #ddd;
  }

  p {
    margin: 4px 0;
    line-height: 18px;
    padding-left: 10px;
    position: relative;
    &::before {
      content: "*";
      position: absolute;
      left: 0;
    }
    span {
      display: inline-block;
      color: #05c38b;
      font-weight: bold;
      padding: 2px 0;
      font-size: 13px;
      cursor: pointer;
    }
  }
`
