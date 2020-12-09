import * as React from 'react'
import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

import ctrl from '../di'
import { IAPIDeliveryDTO } from 'src/di/dto/APIDeliveryDTO'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const S_StateArea = styled.div`
  border-top: 1px solid #eee;
  padding: 20px 0;
`

const S_StateBox = styled.div`
  height: 200px;
  overflow: auto;
  padding: 0 10px 0 0;
`

const S_StateSummary = styled.div`
  margin-bottom: 20px;
`;

const S_StateList = styled.div`
  table {
    th:first-child {
      width: 35%;
    }
    td {
      p {
        margin: 5px 0;
      }
    }
  }
`

const S_Loading = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    border-top-color: #00dc9b;
    border-left-color: #00dc9b;
    animation: ${spin} 0.85s ease-in-out infinite;
  }
`

const S_CloseBtn = styled.button`
  margin-top: 20px;
  border: 0;
  text-align: center;
  width: 100%;
  font-size: 12px;
  line-height: 36px;
  padding: 0;
  background: #f5f5f5;
  border: 1px solid #ddd;
`

const S_ErrorMessage = styled.p`
  padding: 0 2px;
  color: #bbb;
  font-size: 13px;
`;

interface IProps {
  deliveryId: string
  deliveryCode: string
  closeFnc(): void
}

const DeliveryState: React.FC<IProps> = ({ deliveryId, deliveryCode, closeFnc }) => {

  const [isLoading, setLoading] = useState(true)
  const [errMessage, setErrMessage] = useState('')
  const [deliveryState, setDeliverState] = useState<IAPIDeliveryDTO>(null)

  useEffect(() => {
    (async () => {
      const deliveryStateData = await ctrl.getDeliveryAPI(deliveryId, deliveryCode)
      if(typeof deliveryStateData === 'string') setErrMessage(deliveryStateData)
      else setDeliverState(deliveryStateData)
      setLoading(false)
    })()
  }, [])

  return (
    <S_StateArea>
      <S_StateBox>
        { isLoading && (
          <S_Loading />
        )}
        { !isLoading && !!errMessage && (
          <S_ErrorMessage>{ errMessage }</S_ErrorMessage>
        )}
        { !isLoading && !errMessage && (
          <div>
            <S_StateSummary>
              <table>
                <thead>
                  <tr>
                    <th>발송지</th>
                    <th>도착지</th>
                    <th>배달결과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{deliveryState?.from?.name !== 'undefined' && deliveryState.from.name}</td>
                    <td>{deliveryState?.to?.name !== 'undefined' && deliveryState.to.name}</td>
                    <td>{deliveryState?.state?.text !== 'undefined' && deliveryState.state.text}</td>
                  </tr>
                </tbody>
              </table>
            </S_StateSummary>
            <S_StateList>
              <table>
                <thead>
                  <tr>
                    <th>단계/시간</th>
                    <th>위치/현황</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryState.progresses.map(state => {
                    const dateFormat = new Date(state.time)
                    const year = dateFormat.getFullYear()
                    const month = String(dateFormat.getMonth() + 1).length === 1 ? '0' + (dateFormat.getMonth() + 1) : dateFormat.getMonth() + 1
                    const date = dateFormat.getDate()
                    const hour = String(dateFormat.getHours()).length === 1 ? '0' + dateFormat.getHours() : dateFormat.getHours()
                    const minute = String(dateFormat.getMinutes()).length === 1 ? '0' + dateFormat.getMinutes() : dateFormat.getMinutes()
                    const second = String(dateFormat.getSeconds()).length === 1 ? '0' + dateFormat.getSeconds() : dateFormat.getSeconds()

                    return (
                      <tr>
                        <td>
                          <p>[{state?.status?.text !== 'undefined' && state.status.text.trim()}]</p>
                          <p>{year}-{month}-{date}<br />{hour}:{minute}:{second}</p>
                        </td>
                        <td>
                          { state?.location?.name !== 'undefined' && <p>[{state.location.name.trim()}]</p> }
                          { state?.description !== 'undefined' && <p>{state?.description}</p>}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </S_StateList>
          </div>
        )}
      </S_StateBox>
      <S_CloseBtn onClick={closeFnc}>닫기</S_CloseBtn>
    </S_StateArea>
  )
};

export default DeliveryState