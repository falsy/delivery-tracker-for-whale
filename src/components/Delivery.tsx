import * as React from 'react'
import { useState } from "react"
import styled from '@emotion/styled'

import { DELIVERY_LIST } from '../constants'
import { IDeliveryParams } from '../di/dto/DeliveryDTO'
import AddDeliveryBtn from './AddDeliveryBtn'
import DeliveryState from './DeliveryState'

import ctrl from '../di'
import { CloseIcon } from './CloseIcon'
import { PlusIcon } from './PlusIcon'
import { ArrowDown } from './ArrowDown'

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
    if(code === '') return alert('운송장 번호를 입력해 주세요.')
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
    if(deliveryList[idx].code === '') return alert('운송장 번호를 입력해 주세요.')
    setInlineDeliveryShowIdx(0)
    setInlineDeliveryShowIdx(idx + 1)
  }

  const handleClickCloseDelivery = () => {
    setInlineDeliveryShowIdx(0)
  }

  const handleClickAddMemo = (idx: number) => {
    const copyDeliveryList = [ ...deliveryList ]
    if(typeof copyDeliveryList[idx].memos == "undefined") {
      copyDeliveryList[idx].memos = [""]
    } else {
      copyDeliveryList[idx].memos.push("")
    }

    setDeliveryList(copyDeliveryList)
    setInlineDeliveryShowIdx(0)
    autoSave(copyDeliveryList)
  }

  const handleDeleteMemo = (dIdx: number, mIdx: number) => {
    const copyDeliveryList = [ ...deliveryList ]
    if(typeof copyDeliveryList[dIdx].memos == "undefined") return
    copyDeliveryList[dIdx].memos.splice(mIdx, 1)

    setDeliveryList(copyDeliveryList)
    setInlineDeliveryShowIdx(0)
    autoSave(copyDeliveryList)
  }

  const handleChangeMemo = (dIdx: number, mIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const copyDeliveryList = [ ...deliveryList ]
    if(typeof copyDeliveryList[dIdx].memos == "undefined" || typeof copyDeliveryList[dIdx].memos[mIdx] == "undefined") return
    copyDeliveryList[dIdx].memos[mIdx] = e.target.value

    setDeliveryList(copyDeliveryList)
    setInlineDeliveryShowIdx(0)
    autoSave(copyDeliveryList)
  }

  return (
    <>
      <$deliveryArea>
        {deliveryList.map((delivery, i) => (
          <$deliveryBox key={i}>
            <$deleteBtn className={'delete-btn'} onClick={() => handleClickDeleteDelivery(i)}>
              <CloseIcon />
            </$deleteBtn>
            <$labelArea>
              <$addLabel onClick={() => handleClickAddMemo(i)}>
                <PlusIcon />
              </$addLabel>
              <$labelInput type="text" value={delivery.label} onChange={handleChangeInput.bind(this, 'label', i)} placeholder="이곳에 배송에 대한 간단한 메모를 적을 수 있어요." />
            </$labelArea>
            {delivery?.memos?.length > 0 && (
              <$memoBox>
                <ul>
                  {delivery.memos.map((memo, j) => {
                    return (
                      <li key={'memo' + i + j}>
                        <div>
                          <$memoInput type="text" value={memo} onChange={(e) => {handleChangeMemo(i, j, e)}} placeholder="이곳에 추가적인 메모를 입력할 수 있어요." />
                          <$closeMemo onClick={() => handleDeleteMemo(i, j)}>
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
              <$selectTitle onClick={handleClickOpenSelectBox.bind(this, i)}>
                { DELIVERY_LIST.filter(d => d.uid === delivery.uid)[0].name }
                <$selectArrow>
                  <ArrowDown />
                </$selectArrow>
              </$selectTitle>
              <$selectBox isShow={selectBoxOpenIdx === i + 1}>
                {DELIVERY_LIST.map((deliveryData, j) => (
                  <$selectList key={'select' + i + j} onClick={handleClickSelect.bind(this, i, j)}>{deliveryData.name}</$selectList>
                ))}
              </$selectBox>
            </$selectArea>
            <$codeBox>
              <$codeInput type="text" value={delivery.code} onChange={handleChangeInput.bind(this, 'code', i)} isShort={delivery.isInline && delivery.isWindow} placeholder="운송장 번호를 입력해주세요." />
              <$codeSumbitBtn onClick={handleClickNewWindowDelivery.bind(this, delivery)} isShow={delivery.isWindow} isWindow={true}>새창</$codeSumbitBtn>
              <$codeSumbitBtn onClick={handleClickInlineDelivery.bind(this, i)} isShow={delivery.isInline} >조회</$codeSumbitBtn>
            </$codeBox>
            { inlineDeliveryOpenIdx === i + 1 && (
              <DeliveryState deliveryCode={delivery.code} deliveryId={DELIVERY_LIST.filter(d => d.uid === delivery.uid)[0].id} isReverse={DELIVERY_LIST.filter(d => d.uid === delivery.uid)[0].isReverse} closeFnc={handleClickCloseDelivery} />
            )}
          </$deliveryBox>
        ))}
      </$deliveryArea>
      <AddDeliveryBtn deliveryList={deliveryList} setDeliveryList={setDeliveryList} autoSave={autoSave} />
    </>
  )
}

export default Delivery

const $deliveryArea = styled.section`
  padding: 20px 20px 0;
`

const $deliveryBox = styled.div`
  position: relative;
  padding: 20px 20px 0;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
  &:hover {
    .delete-btn {
      opacity: 1;
    }
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
  box-shadow: 1px 1px 4px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: opacity 0.3s;
  font-size: 18px;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  ${props => props.isShow && 'display: block;'}
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
`

const $codeBox = styled.div`
  padding-bottom: 20px;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`

const $codeInput = styled.input<{isShort: boolean}>`
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

const $codeSumbitBtn = styled.button<{isShow: boolean; isWindow?: boolean}>`
  float: left;
  border: 1px solid #05c38b;
  line-height: 40px;
  padding: 0;
  background: #00dc9b;
  color: #fff;
  width: 20%;
  font-size: 14px;
  cursor: pointer;
  text-shadow: 0px 0px 1px #075c43;
  letter-spacing: 1px;
  font-weight: 700;
  ${props => props.isWindow && `
    background: #f5f5f5;
    border: 1px solid #ddd;
    text-shadow: none;
    color: #000;
    font-weight: 500;
    &:hover {
      background: #eaeaea;
    }
  `}
  display: none;
  ${props => props.isShow && `
    display: block;
  `}
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`