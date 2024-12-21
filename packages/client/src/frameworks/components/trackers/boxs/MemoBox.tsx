import { css, cx } from "@styled-system/css"
import PlusIcon from "@components/commons/icons/PlusIcon"
import CloseIcon from "@components/commons/icons/CloseIcon"

export default function MemoBox({
  memos,
  changeMemo
}: {
  memos: string[]
  changeMemo: (memos: string[]) => void
}) {
  const handleChangeMemo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newMemos = memos.map((memo) => memo)
    const newMemo = e.target.value
    newMemos[idx] = newMemo
    changeMemo(newMemos)
  }

  const handleClickAddMemo = async () => {
    changeMemo([...memos, ""])
  }

  const handleDeleteMemo = async (idx: number) => {
    const newMemos = memos.filter((_, i) => i !== idx)
    changeMemo(newMemos)
  }

  return (
    <div
      className={css({
        paddingBottom: "15px"
      })}
    >
      <div>
        <button
          id="create-memo-button"
          className={css({
            display: "flex",
            lineHeight: "20px",
            gap: "3px",
            padding: "0 2px 2px 0",
            fontSize: "12px",
            color: "#087e5b",
            fontWeight: "bold",
            "@media (prefers-color-scheme: dark)": {
              color: "#05c38b"
            },
            "& > svg": {
              marginTop: "2px",
              width: "16px",
              height: "auto",
              cursor: "pointer",
              stroke: "#087e5b",
              "@media (prefers-color-scheme: dark)": {
                stroke: "#05c38b"
              }
            }
          })}
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
                  className={css({
                    display: "grid",
                    gridTemplateColumns: "1fr 24px",
                    gap: "5px",
                    padding: "1px"
                  })}
                >
                  <input
                    className={css({
                      flexGrow: 1,
                      lineHeight: "20px",
                      width: "100%",
                      fontSize: "13px",
                      padding: "2px 5px",
                      border: 0,
                      background: "transparent",
                      "@media (prefers-color-scheme: dark)": {
                        color: "#bbb"
                      }
                    })}
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
                    aria-label="delete-memo-button"
                    className={cx(
                      "delete-memo-button",
                      css({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& > svg": {
                          opacity: 0.5
                        },
                        "@media (prefers-color-scheme: dark)": {
                          "& > svg": {
                            stroke: "#eee"
                          }
                        }
                      })
                    )}
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
