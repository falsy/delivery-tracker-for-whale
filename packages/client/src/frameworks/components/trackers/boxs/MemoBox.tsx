import { useEffect, useState } from "react"
import { css } from "@emotion/react"
import ITrackerDTO from "@domains/dtos/interfaces/ITrackerDTO"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import PlusIcon from "@components/icons/PlusIcon"
import CloseIcon from "@components/icons/CloseIcon"

export default function MemoBox({ trackerId }: { trackerId: string }) {
  const { controllers } = useDependencies()
  const { setMessage } = useError()
  const { trackers, getTrackers } = useTrackers()

  const tracker = trackers.find((tracker) => tracker.id === trackerId)
  const [memos, setMemos] = useState(tracker.memos)

  useEffect(() => {
    if (memos.length !== tracker.memos.length) {
      setMemos(tracker.memos)
    }
  }, [tracker.memos])

  const handleChangeMemo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const cacheMemos = memos.map((memo) => memo)
    const newMemos = memos.map((memo) => memo)
    const newMemo = e.target.value
    newMemos[idx] = newMemo
    setMemos(newMemos)
    const { isError } = await controllers.tracker.updateMemo(
      tracker,
      idx,
      newMemo
    )
    if (isError) {
      setMessage()
      setMemos(cacheMemos)
      return
    }
    getTrackers()
  }

  const handleClickAddMemo = async (tracker: ITrackerDTO) => {
    const { isError } = await controllers.tracker.addMemo(tracker)
    if (isError) {
      setMessage()
      return
    }
    getTrackers()
  }

  const handleDeleteMemo = async (idx: number) => {
    const { isError } = await controllers.tracker.deleteMemo(tracker, idx)
    if (isError) {
      setMessage()
      return
    }
    getTrackers()
  }

  return (
    <div
      css={css`
        padding-bottom: 15px;
      `}
    >
      <div>
        <button
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
          onClick={() => handleClickAddMemo(tracker)}
        >
          <PlusIcon /> 메모 추가
        </button>
      </div>
      {memos.length > 0 && (
        <div>
          <ul>
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
