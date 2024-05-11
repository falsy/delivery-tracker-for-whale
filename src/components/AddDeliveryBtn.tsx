import * as React from 'react'
import styled from '@emotion/styled'
import { DELIVERY_INIT } from '../constants'
import { IDeliveryParams } from '../di/dto/DeliveryDTO'

interface IPorps {
  deliveryList: Array<IDeliveryParams>
  setDeliveryList(delivery: Array<IDeliveryParams>): void
  autoSave(delivery: Array<IDeliveryParams>): void
}

const AddDeliveryBtn: React.FC<IPorps> = ({ deliveryList, setDeliveryList, autoSave }) => {

  const handleClickAddDelivery = () => {
    const newDelivery: IDeliveryParams = DELIVERY_INIT
    const newDeliveryList = [...deliveryList, newDelivery]
    setDeliveryList(newDeliveryList)
    autoSave(newDeliveryList)
  }

  return (
    <$addBtnArea>
      <$addBtn onClick={handleClickAddDelivery}>추가</$addBtn>
    </$addBtnArea>
  )
};

export default AddDeliveryBtn

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