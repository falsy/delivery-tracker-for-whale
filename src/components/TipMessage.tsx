import * as React from 'react'
import styled from '@emotion/styled'

const S_TipMessageArea = styled.section`
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

const TipMessage: React.FC = () => {

  const handleClickReset = () => {

  }

  return (
    <S_TipMessageArea>
      <p>'조회'가 되지 않는 경우 '새창'을 통해 확인하실 수 있습니다.</p>
      <p>'<a href="https://github.com/shlee322/delivery-tracker" target="_blank">Delivery Tracker</a>' 에서 제공하는 API를 사용합니다.</p>
      <p>업데이트로 인해 정상 동작하지 않을 경우 <span onClick={handleClickReset}>'이곳'</span>을 눌러 데이터를<br />초기화 후 이용해주세요.</p>
    </S_TipMessageArea>
  )
}

export default TipMessage