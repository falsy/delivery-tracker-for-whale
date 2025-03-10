export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="block w-full mt-5 text-center text-xs leading-[36px] p-0 bg-buttonBG border border-border dark:bg-buttonBG-dark dark:border-border-dark text-black dark:text-white"
      onClick={onClick}
    >
      닫기
    </button>
  )
}
