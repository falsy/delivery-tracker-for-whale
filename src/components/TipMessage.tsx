import * as React from 'react'
import styled from '@emotion/styled'
import { DELIVERY_INIT } from '../constants'
import { IDeliveryParams } from '../di/dto/DeliveryDTO'

interface IProps {
  setDeliveryList(params: Array<IDeliveryParams>): void
}

const TipMessage: React.FC<IProps> = ({ setDeliveryList }) => {

  const handleClickReset = () => {
    if(window.confirm('초기화하면 기존의 저정된 모든 운송장 번호가 삭제됩니다.\n미리 다른곳에 메모해 주세요.'))
    setDeliveryList([DELIVERY_INIT])
  }

  return (
    <$tipMessageArea>
      <p>업데이트로 인해 정상 동작하지 않을 경우 <span onClick={handleClickReset}>[이곳]</span>을 눌러<br />데이터를 초기화하신 후 이용해 주세요.</p>
    </$tipMessageArea>
  )
}

export default TipMessage

const $tipMessageArea = styled.section`
  padding: 0 20px;
  font-size: 12px;
  color: #444;
  p {
    margin: 4px 0;
    line-height: 18px;
    padding-left: 10px;
    position: relative;
    &::before {
      content: '*';
      position: absolute;
      left: 0;
    }
    span {
      display: inline-block;
      color: #05c38b;
      font-weight: bold;
      padding: 0 2px;
      cursor: pointer;
    }
  }
`