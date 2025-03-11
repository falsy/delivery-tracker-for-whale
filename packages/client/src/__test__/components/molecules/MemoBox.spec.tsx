import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import MemoBox from "@components/molecules/MemoBox"

describe("MemoBox", () => {
  it("초기에 '메모 추가' 버튼만 렌더링되는지 확인", () => {
    render(<MemoBox memos={[]} changeMemos={() => {}} />)

    expect(
      screen.getByRole("button", { name: "메모 추가" })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("list", { name: "memo-list" })
    ).not.toBeInTheDocument()
  })

  it("메모 추가 버튼 클릭 시 changeMemos가 호출되는지 확인", () => {
    const changeMemos = vi.fn()
    render(<MemoBox memos={[]} changeMemos={changeMemos} />)

    const addButton = screen.getByRole("button", { name: "메모 추가" })
    fireEvent.click(addButton)

    expect(changeMemos).toHaveBeenCalledTimes(1)
    expect(changeMemos).toHaveBeenCalledWith([""])
  })

  it("메모가 있을 때 리스트가 렌더링되는지 확인", () => {
    const memos = ["첫 번째 메모", "두 번째 메모"]
    render(<MemoBox memos={memos} changeMemos={() => {}} />)

    const memoList = screen.getByRole("list", { name: "memo-list" })
    expect(memoList).toBeInTheDocument()
    expect(screen.getAllByRole("listitem")).toHaveLength(2)
  })

  it("메모가 여러 개 추가된 후 리스트가 갱신되는지 확인", () => {
    let memos = ["첫 번째 메모"]
    const changeMemos = vi.fn((newMemos) => {
      memos = newMemos
    })

    render(<MemoBox memos={memos} changeMemos={changeMemos} />)

    const addButton = screen.getByRole("button", { name: "메모 추가" })
    fireEvent.click(addButton)
    fireEvent.click(addButton)

    expect(changeMemos).toHaveBeenCalledTimes(2)
    expect(changeMemos).toHaveBeenCalledWith(["첫 번째 메모", ""])
  })
})
