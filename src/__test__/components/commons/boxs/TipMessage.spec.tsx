import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TipMessage from "@components/commons/boxs/TipMessage"
import useDependencies from "@hooks/useDependencies"
import useTrackers from "@hooks/useTrackers"

jest.mock("@hooks/useDependencies")
jest.mock("@hooks/useTrackers")
jest.mock("@hooks/useTrackers")

describe("TipMessage", () => {
  beforeEach(() => {
    ;(useDependencies as jest.Mock).mockReturnValue({
      controllers: {
        tracker: {
          clearTrackers: jest.fn().mockReturnValue({ isError: false }),
          addTracker: jest.fn().mockReturnValue({ isError: false })
        }
      }
    })
    ;(useTrackers as jest.Mock).mockReturnValue({
      getTrackers: jest.fn()
    })

    jest.spyOn(window, "confirm").mockReturnValue(true)
  })

  test("TipMessage 컴포넌트 렌더링 확인", () => {
    render(<TipMessage />)

    expect(screen.getByRole("button", { name: "[초기화]" })).toBeInTheDocument()
  })

  test("초기화 버튼 동작 확인", async () => {
    render(<TipMessage />)

    const resetButton = screen.getByRole("button", { name: "[초기화]" })
    userEvent.click(resetButton)

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalled()
    })

    // 기존의 트래커를 초기화
    await waitFor(() => {
      expect(
        useDependencies().controllers.tracker.clearTrackers
      ).toHaveBeenCalled()
    })

    // 새로운 빈 트래커 추가
    await waitFor(() => {
      expect(
        useDependencies().controllers.tracker.addTracker
      ).toHaveBeenCalled()
    })

    // 트래거 리스트를 리로드
    await waitFor(() => {
      expect(useTrackers().getTrackers).toHaveBeenCalled()
    })
  })
})
