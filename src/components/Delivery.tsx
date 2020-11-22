import * as React from 'react'
import { useState } from "react"
import styled from '@emotion/styled'

import { DELIVERY_LIST } from '../constants'
import { IDeliveryParams } from '../di/dto/DeliveryDTO'
import AddDeliveryBtn from './AddDeliveryBtn'
import DeliveryState from './DeliveryState'

import ctrl from '../di'

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

const S_SelectBox = styled.ul<{ isShow: boolean }>`
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
  ${props => props.isShow && 'display: block;'}
`

const S_SelectList = styled.li`
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
`

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
`

let lazySave: number = 0
const autoSave = (deliveryList: Array<IDeliveryParams>) => {
  if(lazySave) window.clearTimeout(lazySave)
  lazySave = window.setTimeout(() => {
    ctrl.setDelivery(deliveryList)
  }, 500)
}

interface IProps {
  deliveryList: Array<IDeliveryParams>
  setDeliveryList(params: Array<IDeliveryParams>): void
}

const Delivery: React.FC<IProps> = ({ deliveryList, setDeliveryList }) => {

  const [isMouseEnter, setMouseEnter] = useState(0)
  const [selectBoxOpenIdx, setSelectBoxOpenIdx] = useState(0)
  const [inlineDeliveryOpenIdx, setInlineDeliveryShowIdx] = useState(0)
  
  const updateDeliveryMultiData = (idx: number, keyValue: { uid?: number, label?: string, code?: string, isInline?: boolean, isWindow?: boolean}) => {
    const copyDeliveryList = [ ...deliveryList ]
    const delivery = { ...deliveryList[idx] }
    copyDeliveryList[idx] = Object.assign(delivery, keyValue)
    
    setDeliveryList(copyDeliveryList)
    setInlineDeliveryShowIdx(0)
    autoSave(copyDeliveryList)
  }

  const updateDeliveryData = (key: string, idx: number, value: number | string | boolean | never) => {
    const copyDeliveryList = [ ...deliveryList ]
    const targetDelivery = { ...deliveryList[idx] }
    copyDeliveryList[idx] = Object.assign(targetDelivery, { [key] : value })

    setDeliveryList(copyDeliveryList)
    setInlineDeliveryShowIdx(0)
    autoSave(copyDeliveryList)
  }

  const handleMouseEnter = (showIdx: number) => {
    setMouseEnter(showIdx)
  }

  const handleChangeInput = (key: string, idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    updateDeliveryData(key, idx, e.target.value)
  }

  const handleClickDeleteDelivery = (idx: number) => {
    const filterDelivery = deliveryList.filter((d, i) => i !== idx)
    setInlineDeliveryShowIdx(0)
    setDeliveryList(filterDelivery)
    autoSave(filterDelivery)
  }

  const handleClickOpenSelectBox = (idx: number) => {
    setSelectBoxOpenIdx(selectBoxOpenIdx === idx + 1 ? 0 : idx + 1)
  }

  const handleClickSelect = (boxIdx: number, idx: number) => {
    updateDeliveryMultiData(boxIdx, {
      uid: DELIVERY_LIST[idx].uid,
      isInline: DELIVERY_LIST[idx].isInline,
      isWindow: DELIVERY_LIST[idx].isWindow
    })
    setSelectBoxOpenIdx(0)
  }

  const handleClickNewWindowDelivery = (deliveryData: IDeliveryParams) => {
    const { code, uid: targetUid } = deliveryData
    const { uid, name, api } = DELIVERY_LIST.filter(d => d.uid === targetUid)[0]
    
    if(uid === 9) {
      const code1 = '?billno1=' + String(code).substring(0, 4)
      const code2 = '&billno2=' + String(code).substring(4, 7)
      const code3 = '&billno3=' + String(code).substring(7, 13)
      window.open(api+code1+code2+code3, name, 'resizable=yes,scrollbars=yes,width=720,height=600')
    } else {
      window.open(api+code, name, 'resizable=yes,scrollbars=yes,width=720,height=600')
    }
  }

  const handleClickInlineDelivery = (idx: number) => {
    setInlineDeliveryShowIdx(0)
    setInlineDeliveryShowIdx(idx + 1)
  }

  const handleClickCloseDelivery = () => {
    setInlineDeliveryShowIdx(0)
  }

  return (
    <>
      <S_DeliveryArea>
        {deliveryList.map((delivery, i) => (
          <div key={i} onMouseEnter={handleMouseEnter.bind(this, i + 1)} onMouseLeave={handleMouseEnter.bind(this, 0)}>
            <S_DeleteBtn onClick={handleClickDeleteDelivery.bind(this, i)} isShow={isMouseEnter === i + 1}>×</S_DeleteBtn>
            <S_LabelInput type="text" value={delivery.label} onChange={handleChangeInput.bind(this, 'label', i)} placeholder="배송에 대한 간단한 메모를 적을 수 있어요." />
            <S_SelectArea>
              <S_SelectTitle onClick={handleClickOpenSelectBox.bind(this, i)}>
                { DELIVERY_LIST.filter(d => d.uid === delivery.uid)[0].name }
                <S_SelectArrow>›</S_SelectArrow>
              </S_SelectTitle>
              <S_SelectBox isShow={selectBoxOpenIdx === i + 1}>
                {DELIVERY_LIST.map((deliveryData, j) => (
                  <S_SelectList onClick={handleClickSelect.bind(this, i, j)}>{deliveryData.name}</S_SelectList>
                ))}
              </S_SelectBox>
            </S_SelectArea>
            <S_CodeBox>
              <S_CodeInput type="text" value={delivery.code} onChange={handleChangeInput.bind(this, 'code', i)} isShort={delivery.isInline && delivery.isWindow} placeholder="운송장 번호를 입력해주세요." />
              <S_CodeSumbitBtn onClick={handleClickNewWindowDelivery.bind(this, delivery)} isShow={delivery.isWindow} isWindow={true}>새창</S_CodeSumbitBtn>
              <S_CodeSumbitBtn onClick={handleClickInlineDelivery.bind(this, i)} isShow={delivery.isInline} >조회</S_CodeSumbitBtn>
            </S_CodeBox>
            { inlineDeliveryOpenIdx === i + 1 && (
              <DeliveryState deliveryCode={delivery.code} deliveryId={DELIVERY_LIST.filter(d => d.uid === delivery.uid)[0].id} closeFnc={handleClickCloseDelivery} />
            )}
          </div>
        ))}
      </S_DeliveryArea>
      <AddDeliveryBtn deliveryList={deliveryList} setDeliveryList={setDeliveryList} autoSave={autoSave} />
    </>
  )
}

export default Delivery