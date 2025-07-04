import { Button } from "@headlessui/react"
import PlusIcon from "@components/atoms/icons/PlusIcon"
import MemoItem from "@components/atoms/MemoItem"

export default function MemoBox({
  memos,
  changeMemos,
  autoSaveTracker
}: {
  memos: string[]
  changeMemos: (memos: string[]) => void
  autoSaveTracker: (tracker: { memos: string[] }) => void
}) {
  const handleClickAddMemo = () => {
    changeMemos([...memos, ""])
  }

  const deleteMemo = (index: number) => {
    changeMemos(memos.filter((_, i) => i !== index))
  }

  const handleChangeAutoSaveMemos = (index: number, value: string) => {
    const newMemos = [...memos]
    newMemos[index] = value
    autoSaveTracker({ memos: newMemos })
  }

  return (
    <div>
      <div>
        <Button
          id="create-memo-button"
          className="flex items-center gap-1 text-xs font-bold text-primary px-0 py-0.5 cursor-pointer"
          onClick={handleClickAddMemo}
        >
          <PlusIcon className="w-4 stroke-primary" />
          메모 추가
        </Button>
      </div>
      {memos.length > 0 && (
        <div>
          <ul id="memo-list" aria-label="memo-list">
            {memos.map((memo, i) => (
              <li key={`${i}-${memo}`}>
                <MemoItem
                  index={i}
                  memos={memos}
                  deleteMemo={deleteMemo}
                  autoSaveMemos={handleChangeAutoSaveMemos}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
