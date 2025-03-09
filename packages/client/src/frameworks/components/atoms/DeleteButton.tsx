import CloseIcon from "@components/atoms/icons/CloseIcon"

export default function DeleteButton({
  handleClick
}: {
  handleClick: () => void
}) {
  return (
    <button
      aria-label="delete-button"
      className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <CloseIcon className="w-[18px] h-[18px] dark:stroke-white" />
    </button>
  )
}
