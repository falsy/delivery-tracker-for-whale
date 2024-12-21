import { KeyboardEvent, useEffect, useRef, useState } from "react"
import { css } from "@styled-system/css"
import ICarrier from "@domains/entities/interfaces/ICarrier"
import ArrowDownIcon from "@components/commons/icons/ArrowDownIcon"

export default function CarrierSelectBox({
  carriers,
  carrier,
  changeCarrierId
}: {
  carriers: ICarrier[]
  carrier: ICarrier
  changeCarrierId: (carrierId: string) => void
}) {
  const menuButtonRef = useRef(null)
  const menuRef = useRef(null)

  const [isShowSelectBox, setIsShowSelectBox] = useState(false)

  const handleClickSelect = async (carrierId: string) => {
    setIsShowSelectBox(false)
    if (menuButtonRef?.current) {
      menuButtonRef.current.focus()
    }
    changeCarrierId(carrierId)
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

  useEffect(() => {
    if (isShowSelectBox && carrier && menuRef?.current) {
      const items = menuRef.current.querySelectorAll('[role="menuitem"]')
      const findIndex = carriers.findIndex((c) => c.id === carrier.id)
      const index = findIndex === -1 ? 0 : findIndex
      items[index]?.focus()
    }
  }, [isShowSelectBox, carrier])

  return (
    <div
      className={css({
        position: "relative",
        paddingBottom: "10px"
      })}
    >
      <button
        ref={menuButtonRef}
        aria-expanded={isShowSelectBox}
        aria-controls="carrier-select-box"
        className={css({
          margin: 0,
          lineHeight: "40px",
          padding: "0 15px",
          border: "1px solid #ddd",
          display: "block",
          width: "100%",
          fontSize: "15px",
          fontWeight: 500,
          background: "transparent",
          textAlign: "left",
          "@media (prefers-color-scheme: dark)": {
            borderColor: "rgb(85, 85, 85)",
            color: "#fff"
          }
        })}
        onClick={() => setIsShowSelectBox((prevState) => !prevState)}
      >
        {carrier.displayName}
        <div
          className={css({
            position: "absolute",
            right: "15px",
            top: "13px",
            lineHeight: 0,
            "& > svg": {
              width: "16px",
              height: "auto"
            }
          })}
        >
          <ArrowDownIcon />
        </div>
      </button>
      {isShowSelectBox && (
        <div>
          <div
            className={css({
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 50
            })}
            onClick={() => setIsShowSelectBox(false)}
          />
          <div
            id="carrier-select-box"
            className={css({
              position: "absolute",
              width: "100%",
              padding: 0,
              lineHeight: "38px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              marginTop: "4px",
              background: "#f9f9f9",
              zIndex: 100,
              maxHeight: "240px",
              overflowY: "scroll",
              borderBottom: "1px solid #ddd",
              boxShadow: "0 1px 12px rgba(0, 0, 0, 0.2)",
              "@media (prefers-color-scheme: dark)": {
                borderColor: "rgb(85, 85, 85)",
                color: "#fff"
              }
            })}
          >
            <ul role={"menu"} ref={menuRef} onKeyDown={handleKeyDown}>
              {carriers.map((carrier) => (
                <li
                  key={carrier.id}
                  className={css({
                    padding: "1px 1px",
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                    fontSize: "13px",
                    "&:hover": {
                      background: "#fff"
                    },
                    "&:last-child": {
                      borderBottom: 0
                    },
                    "@media (prefers-color-scheme: dark)": {
                      background: "rgb(55, 55, 55)",
                      borderColor: "rgb(85, 85, 85)",
                      "&:hover": {
                        background: "rgb(65, 65, 65)"
                      }
                    }
                  })}
                >
                  <button
                    role={"menuitem"}
                    className={css({
                      display: "block",
                      width: "100%",
                      border: 0,
                      background: "transparent",
                      padding: "0 14px",
                      textAlign: "left",
                      lineHeight: "38px",
                      "@media (prefers-color-scheme: dark)": {
                        color: "#fff"
                      }
                    })}
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
