export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="block w-full mt-5 text-center text-xs leading-[36px] p-0 bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
      onClick={onClick}
    >
      닫기
    </button>
  )
}
