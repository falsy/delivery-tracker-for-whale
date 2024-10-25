import { css } from "@emotion/react"
import CloseIcon from "../../icons/CloseIcon"
import useError from "../../../hooks/useError"

export default function ErrorMessage() {
  const { message, setMessage } = useError()

  if (message === "") return null

  return (
    <div
      css={css`
        margin: 20px 20px 0;
        padding: 10px 10px 10px 20px;
        background: #ffd4b9;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
        white-space: pre-wrap;
        line-height: 18px;
        font-size: 12px;
        color: #444;
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 30px;
          align-items: center;
          gap: 10px;
        `}
      >
        <p>
          {message === "error" ? "알 수 없는 오류가 발생하였습니다." : message}
        </p>
        <button
          css={css`
            border: 0;
            background: none;
            line-height: 0;
            padding: 5px;
          `}
          onClick={() => setMessage()}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}
