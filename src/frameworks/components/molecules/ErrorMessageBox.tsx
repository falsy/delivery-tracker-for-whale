import useError from "@hooks/useError"
import CloseIcon from "@components/atoms/icons/CloseIcon"

export default function ErrorMessageBox() {
  const { message, resetMessage } = useError()

  if (message === "") return null

  const handleClickReset = () => {
    resetMessage()
  }

  return (
    <div className="mt-5 mx-5 p-2.5 pl-5 bg-orange-200 shadow-md whitespace-pre-wrap leading-[18px] text-xs text-gray-700">
      <div className="grid grid-cols-[1fr_30px] items-center gap-2.5">
        <p>
          {message === "error" ? "알 수 없는 오류가 발생하였습니다." : message}
        </p>
        <button className="border-0 bg-none p-1" onClick={handleClickReset}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}
