import { ChangeEvent, useState } from "react"
import { Button } from "@headlessui/react"
import CloseIcon from "@components/atoms/icons/CloseIcon"

export default function MemoItem({
  index,
  memos,
  deleteMemo,
  autoSaveMemos
}: {
  index: number
  memos: string[]
  deleteMemo: (index: number) => void
  autoSaveMemos: (index: number, value: string) => void
}) {
  const [memo, setMemo] = useState(memos[index])

  const handleChangeMemo = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setMemo(value)
    autoSaveMemos(index, value)
  }

  const handleClickDeleteMemo = () => {
    deleteMemo(index)
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
        onClick={handleClickDeleteMemo}
      >
        <CloseIcon className="opacity-50 dark:stroke-gray-200" />
      </Button>
    </div>
  )
}
