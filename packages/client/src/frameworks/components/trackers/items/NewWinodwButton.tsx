import { css } from "@styled-system/css"
import ICarrierDTO from "@domains/dtos/interfaces/ICarrierDTO"

export default function NewWinodwButton({
  carrier,
  trackingNumber
}: {
  carrier: ICarrierDTO
  trackingNumber: string
}) {
  const handleClickNewWindowTracker = () => {
    const { popupURL } = carrier

    window.open(
      popupURL + trackingNumber,
      "",
      "resizable=yes,scrollbars=yes,width=720,height=600"
    )
  }

  return (
    <button
      className={css({
        width: "30%",
        minWidth: "60px",
        lineHeight: "40px",
        background: "#f5f5f5",
        border: "1px solid #ddd",
        borderRight: 0,
        borderTopColor: "rgb(220, 220, 220)",
        borderBottomColor: "rgb(220, 220, 220)",
        textShadow: "none",
        color: "#000",
        fontWeight: 500,
        "&:last-of-type": {
          borderRight: "1px solid rgb(220, 220, 220)"
        },
        transition: "all 0.3s",
        _hover: {
          background: "#eaeaea",
          opacity: 0.8
        },
        "@media (prefers-color-scheme: dark)": {
          background: "rgb(44, 44, 44)",
          color: "#ddd",
          borderColor: "rgb(85, 85, 85)",
          borderRight: 0,
          borderTopColor: "rgb(50, 50, 50)",
          borderBottomColor: "rgb(50, 50, 50)",
          "&:last-of-type": {
            borderRight: "1px solid rgb(50, 50, 50)"
          },
          _hover: {
            background: "rgb(30, 30, 30)"
          }
        }
      })}
      onClick={handleClickNewWindowTracker}
    >
      새창
    </button>
  )
}
