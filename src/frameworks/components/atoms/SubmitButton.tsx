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
        "w-20 h-10 cursor-pointer",
        "text-white text-sm font-[600]",
        "transition-opacity transition-03s hover:opacity-80",
        "bg-gradient-to-br from-[#6AEA55] to-[#59C9E3]",
        "text-shadow-[0_0_1px_#139ab8]",
        "rounded-4xl"
      ])}
      onClick={handleClick}
    >
      조회
    </button>
  )
}
