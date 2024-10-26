import { css } from "@emotion/react"
import ICarrierDTO from "@core/dtos/interfaces/ICarrierDTO"

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
      css={css`
        width: 30%;
        min-width: 60px;
        line-height: 40px;
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-right: 0;
        border-top-color: rgb(220, 220, 220);
        border-bottom-color: rgb(220, 220, 220);
        text-shadow: none;
        color: #000;
        font-weight: 500;
        &:last-of-type {
          border-right: 1px solid rgb(220, 220, 220);
        }

        @media (prefers-color-scheme: dark) {
          background: rgb(44, 44, 44);
          color: #ddd;
          border-color: rgb(85, 85, 85);
          border-right: 0;
          border-top-color: rgb(50, 50, 50);
          border-bottom-color: rgb(50, 50, 50);
          &:last-of-type {
            border-right: 1px solid rgb(50, 50, 50);
          }
          &:hover {
            background: rgb(30, 30, 30);
          }
        }

        transition: all 0.3s;
        &:hover {
          background: #eaeaea;
          opacity: 0.8;
        }
      `}
      onClick={handleClickNewWindowTracker}
    >
      새창
    </button>
  )
}
