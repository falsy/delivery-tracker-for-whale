export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="block w-full mt-2 text-sm text-center leading-[36px] p-0 bg-buttonBG border border-border dark:bg-buttonBG-dark dark:border-border-dark text-black dark:text-white cursor-pointer"
      onClick={onClick}
    >
      닫기
    </button>
  )
}
