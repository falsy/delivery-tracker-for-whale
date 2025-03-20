import { ChangeEvent } from "react"
import { Button } from "@headlessui/react"
import CloseIcon from "@components/atoms/icons/CloseIcon"

export default function MemoItem({
  index,
  memos,
  changeMemos
}: {
  index: number
  memos: string[]
  changeMemos: (memos: string[]) => void
}) {
  const memo = memos[index]

  const handleChangeMemo = (e: ChangeEvent<HTMLInputElement>) => {
    const newMemos = [...memos]
    newMemos[index] = e.target.value
    changeMemos(newMemos)
  }

  const handleDeleteMemo = () => {
    changeMemos(memos.filter((_, i) => i !== index))
  }

  return (
    <div className="grid grid-cols-[1fr_24px] gap-1 p-0.5">
      <input
        className="flex-grow w-full text-xs leading-[20px] p-0.5 px-1 border-0 bg-transparent dark:text-gray-400"
        type="text"
        value={memo}
        onChange={handleChangeMemo}
        onBlur={handleChangeMemo}
        placeholder="이곳에 추가적인 메모를 입력할 수 있어요."
      />
      <Button
        aria-label="delete-memo-button"
        className="flex items-center justify-center cursor-pointer"
        onClick={handleDeleteMemo}
      >
        <CloseIcon className="opacity-50 dark:stroke-gray-200" />
      </Button>
    </div>
  )
}
