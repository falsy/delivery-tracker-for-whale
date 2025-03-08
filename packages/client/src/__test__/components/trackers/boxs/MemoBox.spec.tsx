import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import MemoBox from "@components/trackers/boxs/MemoBox"

describe("MemoBox 컴포넌트", () => {
  it("메모 추가 버튼을 클릭하면 새로운 메모가 추가된다", async () => {
    const changeMemo = vi.fn()
    const initialMemos = ["메모 1"]
    render(<MemoBox memos={initialMemos} changeMemo={changeMemo} />)

    // "메모 추가" 버튼은 id 또는 버튼 텍스트로 찾을 수 있음.
    const addButton = screen.getByRole("button", { name: /메모 추가/ })
    fireEvent.click(addButton)

    // 기존 메모 배열에 빈 문자열이 추가된 배열을 인자로 changeMemo가 호출되어야 함.
    expect(changeMemo).toHaveBeenCalledWith(["메모 1", ""])
  })

  it("입력값 변경 시 changeMemo 함수가 호출되어야 한다", async () => {
    const changeMemo = vi.fn()
    const initialMemos = ["기존 메모"]
    render(<MemoBox memos={initialMemos} changeMemo={changeMemo} />)

    // placeholder로 input 요소 찾기
    const input = screen.getByPlaceholderText(
      "이곳에 추가적인 메모를 입력할 수 있어요."
    ) as HTMLInputElement

    fireEvent.input(input, { target: { value: "새로운 메모" } })

    expect(changeMemo).toHaveBeenCalledTimes(1)
    expect(changeMemo).toHaveBeenCalledWith(["새로운 메모"])
  })

  it("삭제 버튼 클릭 시 해당 메모가 제거된다", async () => {
    const changeMemo = vi.fn()
    const initialMemos = ["메모 1", "메모 2"]
    render(<MemoBox memos={initialMemos} changeMemo={changeMemo} />)

    // aria-label을 통해 삭제 버튼들 찾기
    const deleteButtons = screen.getAllByLabelText("delete-memo-button")
    // 첫 번째 메모의 삭제 버튼 클릭
    fireEvent.click(deleteButtons[0])

    // "메모 1"이 삭제된 결과로 changeMemo가 호출되어야 함.
    expect(changeMemo).toHaveBeenCalledWith(["메모 2"])
  })
})
