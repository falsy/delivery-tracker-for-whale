import PlusIcon from "@components/atoms/icons/PlusIcon"
import MemoItem from "@components/atoms/MemoItem"
import { Button } from "@headlessui/react"

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
          className="flex items-center gap-1 text-xs font-bold text-green-700 dark:text-green-400 px-0 py-0.5"
          onClick={handleClickAddMemo}
        >
          <PlusIcon className="mt-[2px] w-4 stroke-green-700 dark:stroke-green-400" />
          메모 추가
        </Button>
      </div>
      {memos.length > 0 && (
        <div>
          <ul id="memo-list">
            {memos.map((_, i) => (
              <li key={i}>
                <MemoItem index={i} memos={memos} changeMemos={changeMemos} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
