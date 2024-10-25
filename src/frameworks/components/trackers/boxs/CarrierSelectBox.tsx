import { KeyboardEvent, useRef, useState } from "react"
import { css } from "@emotion/react"
import ICarrierDTO from "../../../../core/dtos/interfaces/ICarrierDTO"
import ITrackerDTO from "../../../../core/dtos/interfaces/ITrackerDTO"
import { useErrorMessage } from "../../../hooks/zustands/useErrorMessage"
import useDependencies from "../../../hooks/useDependencies"
import useTrackerList from "../../../hooks/useTrackerList"
import { useCarriers } from "../../../hooks/zustands/useCarriers"
import ArrowDownIcon from "../../icons/ArrowDownIcon"

export default function CarrierSelectBox({
  carrier,
  tracker
}: {
  carrier: ICarrierDTO
  tracker: ITrackerDTO
}) {
  const { controllers } = useDependencies()
  const { setErrMessage } = useErrorMessage()
  const { getTrackerList } = useTrackerList()
  const { carriers } = useCarriers()

  const menuRef = useRef(null)

  const [isShowSelectBox, setIsShowSelectBox] = useState(false)

  const handleClickSelect = async (carrierId: string) => {
    const { isError } = await controllers.tracker.updateCarrierId(
      tracker,
      carrierId
    )
    if (isError) {
      setErrMessage()
      return
    }
    setIsShowSelectBox(false)
    getTrackerList()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isShowSelectBox) return

    const items = menuRef.current.querySelectorAll('[role="menuitem"]')
    const currentIndex = Array.from(items).indexOf(document.activeElement)

    if (e.key === "ArrowDown") {
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % items.length
      items[nextIndex].focus()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const prevIndex = (currentIndex - 1 + items.length) % items.length
      items[prevIndex].focus()
    } else if (e.key === "Escape") {
      setIsShowSelectBox(false)
    }
  }

  return (
    <div
      css={css`
        position: relative;
        padding-bottom: 10px;
      `}
    >
      <button
        aria-expanded={isShowSelectBox}
        aria-controls="carrier-select-box"
        css={css`
          margin: 0;
          line-height: 40px;
          padding: 0 15px;
          border: 1px solid #ddd;
          display: block;
          width: 100%;
          background: #fff;
          text-align: left;

          @media (prefers-color-scheme: dark) {
            border-color: rgb(85, 85, 85);
            color: #fff;
          }
        `}
        onClick={() => setIsShowSelectBox((prevState) => !prevState)}
      >
        {carrier.displayName}
        <div
          css={css`
            position: absolute;
            right: 15px;
            top: 13px;
            line-height: 0;
            svg {
              width: 16px;
              height: auto;
            }
          `}
        >
          <ArrowDownIcon />
        </div>
      </button>
      {isShowSelectBox && (
        <div>
          <div
            css={css`
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 50;
            `}
            onClick={() => setIsShowSelectBox(false)}
          />
          <div
            id="carrier-select-box"
            css={css`
              position: absolute;
              width: 100%;
              padding: 0;
              line-height: 35px;
              border-left: 1px solid #ddd;
              border-right: 1px solid #ddd;
              margin-top: 0;
              background: #f9f9f9;
              z-index: 100;
              max-height: 240px;
              overflow-y: scroll;
              border-bottom: 1px solid #ddd;

              @media (prefers-color-scheme: dark) {
                border-color: rgb(85, 85, 85);
                color: #fff;
              }
            `}
          >
            <ul role={"menu"} ref={menuRef} onKeyDown={handleKeyDown}>
              {carriers.map((carrier) => (
                <li
                  css={css`
                    padding: 1px 1px;
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
                      background: rgb(55, 55, 55);
                      border-color: rgb(85, 85, 85);
                      &:hover {
                        background: rgb(65, 65, 65);
                      }
                    }
                  `}
                  key={carrier.id}
                >
                  <button
                    role={"menuitem"}
                    css={css`
                      display: block;
                      width: 100%;
                      border: 0;
                      background: transparent;
                      padding: 0 14px;
                      text-align: left;
                      line-height: 35px;
                    `}
                    onClick={() => handleClickSelect(carrier.id)}
                  >
                    {carrier.displayName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}