import * as React from 'react'
import { useState, useEffect } from "react"
import styled from '@emotion/styled'
import AddDeliveryBtn from './AddDeliveryBtn'

import ctrl from '../di'
import { DELIVERY_LIST } from '../constants'
import { IDeliveryParams } from 'src/di/dto/DeliveryDTO'

const S_DeliveryArea = styled.section`
  padding: 20px 20px 0;
  & > div {
    position: relative;
    padding: 20px 20px 0;
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
  }
`

const S_DeleteBtn = styled.span<{isShow: boolean}>`
  position: absolute;
  top: -10px;
  right: -10px;
  line-height: 28px;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 20px;
  background: #fff;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: opacity 0.3s;
  font-size: 18px;
  opacity: 0;
  ${props => props.isShow && 'opacity: 1;'}
`

const S_LabelInput = styled.input`
  line-height: 20px;
  margin: 0 0 10px;
  width: 100%;
  font-size: 13px;
  padding: 0 2px;
  border: 0;
  outline: none;
`

const S_SelectArea = styled.div`
  position: relative;
  padding-bottom: 10px;
`

const S_SelectTitle = styled.p`
  margin: 0;
  line-height: 40px;
  padding: 0 15px;
  border: 1px solid #ddd;
  cursor: pointer;
`

const S_SelectArrow = styled.span`
  position: absolute;
  right: 15px;
  font-size: 16px;
  transform: rotate(90deg);
`

const S_SelectBox = styled.ul`
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
  display: none;
`

const S_SelectList = styled.li`
  padding: 0 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: #fff;
  }
`

const S_CodeBox = styled.div`
  padding-bottom: 20px;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`

const S_CodeInput = styled.input<{isShort: boolean}>`
  float: left;
  line-height: 40px;
  width: 80%;
  margin: 0;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-right: 0;
  font-size: 14px;
  outline: none;
  ${props => props.isShort && 'width: 60%;'}
`;

const S_CodeSumbitBtn = styled.button<{isShow: boolean; isWindow?: boolean}>`
  float: left;
  border: 1px solid #05c38b;
  line-height: 40px;
  padding: 0;
  background: #00dc9b;
  color: #fff;
  width: 20%;
  font-size: 13px;
  cursor: pointer;
  text-shadow: 0px 0px 2px #05c38b;
  letter-spacing: 1px;
  ${props => props.isWindow && `
    background: #f5f5f5;
    border: 1px solid #ddd;
    text-shadow: none;
    color: #000;
  `}
  display: none;
  ${props => props.isShow && 'display: block;'}
`;

let lazySave: number = 0
const autoSave = (deliveryList: Array<IDeliveryParams>) => {
  if(lazySave) window.clearTimeout(lazySave)
  lazySave = window.setTimeout(() => {
    ctrl.setDelivery(deliveryList);
  }, 1000)
}

const Delivery: React.FC = () => {
  const [isMouseEnter, setMouseEnter] = useState(false)
  const [deliveryList, setDeliveryList] = useState([])
  
  useEffect(() => {
    setDeliveryList(ctrl.getDelivery())
  }, [])

  const handleMouseEnter = (isOver: boolean) => setMouseEnter(isOver)
  const handleChangeInput = (key: string, idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const filterDelivery = deliveryList.filter((d, i) => i !== idx)
    const delivery = { ...deliveryList[idx] }
    delivery[key] = e.target.value

    const newDeliveryList = [ ...filterDelivery, delivery]

    setDeliveryList(newDeliveryList)
    autoSave(newDeliveryList)
  }

  return (
    <>
      <S_DeliveryArea onMouseEnter={handleMouseEnter.bind(this, true)} onMouseLeave={handleMouseEnter.bind(this, false)}>
        {deliveryList.map((delivery, i) => (
          <div key={i}>
            <S_DeleteBtn isShow={isMouseEnter}>×</S_DeleteBtn>
            <S_LabelInput type="text" value={delivery.label} onChange={handleChangeInput.bind(this, 'label', i)} placeholder="배송에 대한 간단한 메모를 적을 수 있어요." />
            <S_SelectArea>
              <S_SelectTitle>우체국 택배<S_SelectArrow>›</S_SelectArrow></S_SelectTitle>
              <S_SelectBox>
                {DELIVERY_LIST.map(deliveryData => (
                  <S_SelectList>{deliveryData.name}</S_SelectList>
                ))}
              </S_SelectBox>
            </S_SelectArea>
            <S_CodeBox>
              <S_CodeInput type="text" value={delivery.code} onChange={handleChangeInput.bind(this, 'code', i)} isShort={delivery.isInline && delivery.isWindow} placeholder="운송장 번호를 입력해주세요." />
              <S_CodeSumbitBtn isShow={delivery.isWindow} isWindow={true}>새창</S_CodeSumbitBtn>
              <S_CodeSumbitBtn isShow={delivery.isInline} >조회</S_CodeSumbitBtn>
            </S_CodeBox>
          </div>
        ))}
      </S_DeliveryArea>
      <AddDeliveryBtn />
    </>
  )
};

export default Delivery