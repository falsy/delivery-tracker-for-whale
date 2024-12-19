import { css } from "@styled-system/css"
import useError from "@hooks/useError"
import CloseIcon from "@components/icons/CloseIcon"

export default function ErrorMessage() {
  const { message, setMessage } = useError()

  if (message === "") return null

  return (
    <div
      className={css({
        margin: "20px 20px 0",
        padding: "10px 10px 10px 20px",
        background: "#ffd4b9",
        boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.1)",
        whiteSpace: "pre-wrap",
        lineHeight: "18px",
        fontSize: "12px",
        color: "#444"
      })}
    >
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "1fr 30px",
          alignItems: "center",
          gap: 10
        })}
      >
        <p>
          {message === "error" ? "알 수 없는 오류가 발생하였습니다." : message}
        </p>
        <button
          className={css({
            border: 0,
            background: "none",
            lineHeight: 0,
            padding: "5px"
          })}
          onClick={() => setMessage("")}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}
