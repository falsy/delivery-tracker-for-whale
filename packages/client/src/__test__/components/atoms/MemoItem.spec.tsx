import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import MemoItem from "@components/atoms/MemoItem"

describe("MemoItem", () => {
  const initialMemos = ["메모 1", "메모 2", "메모 3"]

  it("입력 필드가 정상적으로 렌더링되는지 확인", () => {
    render(<MemoItem index={1} memos={initialMemos} changeMemos={() => {}} />)

    const input = screen.getByPlaceholderText(
      "이곳에 추가적인 메모를 입력할 수 있어요."
    )
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("메모 2")
  })

  it("입력 필드 변경 시 changeMemos 핸들러가 호출되는지 확인", () => {
    const changeMemos = vi.fn()
    render(
      <MemoItem index={1} memos={initialMemos} changeMemos={changeMemos} />
    )

    const input = screen.getByPlaceholderText(
      "이곳에 추가적인 메모를 입력할 수 있어요."
    )
    fireEvent.change(input, { target: { value: "새로운 메모" } })

    expect(changeMemos).toHaveBeenCalledTimes(1)
    expect(changeMemos).toHaveBeenCalledWith([
      "메모 1",
      "새로운 메모",
      "메모 3"
    ])
  })

  it("삭제 버튼 클릭 시 해당 메모가 삭제되는지 확인", () => {
    const changeMemos = vi.fn()
    render(
      <MemoItem index={1} memos={initialMemos} changeMemos={changeMemos} />
    )

    const deleteButton = screen.getByRole("button", {
      name: "delete-memo-button"
    })
    fireEvent.click(deleteButton)

    expect(changeMemos).toHaveBeenCalledTimes(1)
    expect(changeMemos).toHaveBeenCalledWith(["메모 1", "메모 3"])
  })
})
