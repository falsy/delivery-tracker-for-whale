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
        "w-[30%] min-w-[60px] h-10 bg-primary cursor-pointer",
        "text-white text-sm font-weight-[500]",
        "transition-opacity transition-03s hover:opacity-80",
        "border border-primary dark:border-border-dark border-l-0"
      ])}
      onClick={handleClick}
    >
      조회
    </button>
  )
}
