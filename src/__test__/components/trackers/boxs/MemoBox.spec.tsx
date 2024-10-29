/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TrackerDTO from "@core/dtos/TrackerDTO"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import MemoBox from "@components/trackers/boxs/MemoBox"

jest.mock("@hooks/useDependencies")
jest.mock("@hooks/useError")
jest.mock("@hooks/useTrackers")

describe("MemoBox 컴포넌트", () => {
  const tracker = new TrackerDTO({
    id: "aaa",
    carrierId: "carrierId",
    label: "initial label",
    trackingNumber: "1234",
    memos: ["initial memo 1", "initial memo 2"]
  })

  beforeEach(() => {
    ;(useDependencies as any).mockReturnValue({
      controllers: {
        tracker: {
          updateMemo: jest.fn(),
          addMemo: jest.fn(),
          deleteMemo: jest.fn()
        }
      }
    })
    ;(useError as any).mockReturnValue({
      setMessage: jest.fn()
    })
    ;(useTrackers as any).mockReturnValue({
      trackers: [tracker],
      getTrackers: jest.fn()
    })
  })

  test("초기 렌더링 시 tracker.memos 값이 input 필드에 설정되어야 한다", () => {
    render(<MemoBox trackerId={"aaa"} />)

    const inputs = screen.getAllByPlaceholderText(
      "이곳에 추가적인 메모를 입력할 수 있어요."
    ) as HTMLInputElement[]
    expect(inputs[0]).toHaveValue("initial memo 1")
    expect(inputs[1]).toHaveValue("initial memo 2")
  })

  test("메모 추가 버튼 클릭 시 addMemo 함수가 호출되어야 한다", async () => {
    const { controllers } = useDependencies()
    ;(controllers.tracker.addMemo as jest.Mock).mockResolvedValue({
      isError: false
    })

    render(<MemoBox trackerId={"aaa"} />)
    const addButton = screen.getByRole("button", { name: /메모 추가/i })

    await userEvent.click(addButton)
    expect(controllers.tracker.addMemo).toHaveBeenCalledWith(tracker)
  })

  test("메모 입력 값을 변경하면 updateMemo 함수가 호출되어야 한다", async () => {
    const { controllers } = useDependencies()
    ;(controllers.tracker.updateMemo as jest.Mock).mockResolvedValue({
      isError: false
    })

    render(<MemoBox trackerId={"aaa"} />)
    const inputs = screen.getAllByPlaceholderText(
      "이곳에 추가적인 메모를 입력할 수 있어요."
    ) as HTMLInputElement[]

    await userEvent.clear(inputs[0])
    await userEvent.type(inputs[0], "updated memo")

    expect(controllers.tracker.updateMemo).toHaveBeenCalledWith(
      tracker,
      0,
      "updated memo"
    )
  })

  test("메모 삭제 버튼 클릭 시 deleteMemo 함수가 호출되어야 한다", async () => {
    const { controllers } = useDependencies()
    ;(controllers.tracker.deleteMemo as jest.Mock).mockResolvedValue({
      isError: false
    })

    render(<MemoBox trackerId={"aaa"} />)
    const deleteButtons = screen.getAllByRole("button")

    await userEvent.click(deleteButtons[1]) // 두 번째 버튼이 첫 번째 메모 삭제 버튼임

    expect(controllers.tracker.deleteMemo).toHaveBeenCalledWith(tracker, 0)
  })

  test("updateMemo에서 에러 발생 시 이전 값으로 복원되어야 한다", async () => {
    const { controllers } = useDependencies()
    const { setMessage } = useError()
    ;(controllers.tracker.updateMemo as jest.Mock).mockResolvedValue({
      isError: true
    })

    render(<MemoBox trackerId={"aaa"} />)
    const inputs = screen.getAllByPlaceholderText(
      "이곳에 추가적인 메모를 입력할 수 있어요."
    ) as HTMLInputElement[]

    await userEvent.clear(inputs[0])
    await userEvent.type(inputs[0], "should not persist")

    await waitFor(() => {
      expect(inputs[0]).toHaveValue("initial memo 1")
    })
    expect(setMessage).toHaveBeenCalled()
  })
})
