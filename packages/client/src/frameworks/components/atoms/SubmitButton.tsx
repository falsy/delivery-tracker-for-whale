import clsx from "clsx"

export default function SubmitButton({
  handleClick
}: {
  handleClick: () => void
}) {
  return (
    <button
      aria-label="submit-button"
      className={clsx([
        "w-[30%] min-w-[60px] h-10 bg-green-600 border-green-600 border-1 cursor-pointer",
        "text-white text-sm h-10 font-weight-[500]",
        "transition-opacity transition-03s hover:opacity-80"
      ])}
      onClick={handleClick}
    >
      조회
    </button>
  )
}
