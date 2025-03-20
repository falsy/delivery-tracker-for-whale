import { Button } from "@headlessui/react"
import PlusIcon from "@components/atoms/icons/PlusIcon"
import MemoItem from "@components/atoms/MemoItem"

export default function MemoBox({
  memos,
  changeMemos
}: {
  memos: string[]
  changeMemos: (memos: string[]) => void
}) {
  const handleClickAddMemo = () => {
    changeMemos([...memos, ""])
  }

  return (
    <div>
      <div>
        <Button
          id="create-memo-button"
          className="flex items-center gap-1 text-xs font-bold text-green-700 dark:text-green-400 px-0 py-0.5 cursor-pointer"
          onClick={handleClickAddMemo}
        >
          <PlusIcon className="w-4 stroke-green-700 dark:stroke-green-400" />
          메모 추가
        </Button>
      </div>
      {memos.length > 0 && (
        <div>
          <ul id="memo-list" aria-label="memo-list">
            {memos.map((memo, i) => (
              <li key={`${i}-${memo}`}>
                <MemoItem index={i} memos={memos} changeMemos={changeMemos} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
