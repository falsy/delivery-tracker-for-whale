import { css } from "@emotion/react"
import PlusIcon from "@components/icons/PlusIcon"
import CloseIcon from "@components/icons/CloseIcon"

export default function MemoBox({
  memos,
  patchTracker
}: {
  memos: string[]
  patchTracker: ({ memos }) => void
}) {
  const handleChangeMemo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newMemos = memos.map((memo) => memo)
    const newMemo = e.target.value
    newMemos[idx] = newMemo
    patchTracker({ memos: newMemos })
  }

  const handleClickAddMemo = async () => {
    patchTracker({ memos: [...memos, ""] })
  }

  const handleDeleteMemo = async (idx: number) => {
    const newMemos = memos.filter((_, i) => i !== idx)
    patchTracker({ memos: newMemos })
  }

  return (
    <div
      css={css`
        padding-bottom: 15px;
      `}
    >
      <div>
        <button
          id="create-memo-button"
          css={css`
            display: flex;
            line-height: 20px;
            gap: 3px;
            padding: 0 2px 2px 0;
            font-size: 12px;
            color: #05c38b;
            font-weight: bold;
            svg {
              margin-top: 2px;
              width: 16px;
              height: auto;
              cursor: pointer;
              stroke: #05c38b;
            }
          `}
          onClick={() => handleClickAddMemo()}
        >
          <PlusIcon /> 메모 추가
        </button>
      </div>
      {memos.length > 0 && (
        <div>
          <ul id="memo-list">
            {memos.map((memo, i) => (
              <li key={i}>
                <div
                  css={css`
                    display: grid;
                    grid-template-columns: 1fr 24px;
                    gap: 5px;
                    padding: 1px;
                  `}
                >
                  <input
                    css={css`
                      flex-grow: 1;
                      line-height: 20px;
                      width: 100%;
                      font-size: 13px;
                      padding: 2px 5px;
                      border: 0;
                      background: transparent;

                      @media (prefers-color-scheme: dark) {
                        color: #bbb;
                      }
                    `}
                    type="text"
                    value={memo}
                    onChange={(e) => {
                      handleChangeMemo(e, i)
                    }}
                    onBlur={(e) => {
                      handleChangeMemo(e, i)
                    }}
                    placeholder="이곳에 추가적인 메모를 입력할 수 있어요."
                  />
                  <button
                    className="delete-memo-button"
                    css={css`
                      cursor: pointer;
                      svg {
                        margin-top: 1px;
                        opacity: 0.5;
                      }

                      @media (prefers-color-scheme: dark) {
                        svg {
                          stroke: #eee;
                        }
                      }
                    `}
                    onClick={() => handleDeleteMemo(i)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
