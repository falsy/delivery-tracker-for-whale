/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MemoBox from "@components/trackers/boxs/MemoBox"

describe("MemoBox 컴포넌트", () => {
  const memos = ["initial memo 1", "initial memo 2"]
  const changeMemo = jest.fn()

  test("초기 렌더링 시 tracker.memos 값이 input 필드에 설정되어야 한다", () => {
    render(<MemoBox memos={memos} changeMemo={changeMemo} />)
    const inputs = screen.getAllByPlaceholderText(
      "이곳에 추가적인 메모를 입력할 수 있어요."
    ) as HTMLInputElement[]

    expect(inputs[0]).toHaveValue("initial memo 1")
    expect(inputs[1]).toHaveValue("initial memo 2")
  })

  test("메모 추가 버튼 클릭 시 changeMemo 함수가 호출되어야 한다", async () => {
    render(<MemoBox memos={memos} changeMemo={changeMemo} />)
    const addButton = screen.getByRole("button", { name: /메모 추가/i })

    await userEvent.click(addButton)

    expect(changeMemo).toHaveBeenCalledWith({
      memos: ["initial memo 1", "initial memo 2", ""]
    })
  })

  test("메모 입력 값을 변경하면 changeMemo 함수가 호출되어야 한다", async () => {
    render(<MemoBox memos={memos} changeMemo={changeMemo} />)
    const inputs = screen.getAllByPlaceholderText(
      "이곳에 추가적인 메모를 입력할 수 있어요."
    ) as HTMLInputElement[]

    await userEvent.clear(inputs[0])
    await userEvent.type(inputs[0], "updated memo")

    waitFor(() =>
      expect(changeMemo).toHaveBeenCalledWith({
        memos: ["updated memo", "initial memo 2"]
      })
    )
  })

  test("메모 삭제 버튼 클릭 시 changeMemo 함수가 호출되어야 한다", async () => {
    render(<MemoBox memos={memos} changeMemo={changeMemo} />)
    const deleteButtons = screen.getAllByRole("button")

    await userEvent.click(deleteButtons[1]) // 두 번째 버튼이 첫 번째 메모 삭제 버튼임

    expect(changeMemo).toHaveBeenCalledWith({ memos: ["initial memo 2"] })
  })
})
