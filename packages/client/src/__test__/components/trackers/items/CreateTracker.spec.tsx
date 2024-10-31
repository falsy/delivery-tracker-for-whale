import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import CreateTracker from "@components/trackers/items/CreateTracker"

jest.mock("@hooks/useDependencies")
jest.mock("@hooks/useError")
jest.mock("@hooks/useTrackers")

describe("배송조회 추가 버튼", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useError as unknown as jest.Mock).mockReturnValue({
      setMessage: jest.fn()
    })
    ;(useDependencies as jest.Mock).mockReturnValue({
      controllers: {
        tracker: {
          addTracker: jest.fn().mockReturnValue({
            isError: true
          })
        }
      }
    })
    ;(useTrackers as jest.Mock).mockReturnValue({
      getTrackers: jest.fn()
    })
  })

  test("배송조회 추가 버튼이 정상적으로 렌더링 되어야 한다.", () => {
    render(<CreateTracker />)

    expect(screen.getByText("추가")).toBeInTheDocument()
  })

  test("배송조회 추가 버튼을 새로운 트래커를 생성한다. (실패)", async () => {
    ;(useDependencies as jest.Mock).mockReturnValue({
      controllers: {
        tracker: {
          addTracker: jest.fn().mockReturnValue({
            isError: true
          })
        }
      }
    })

    render(<CreateTracker />)

    expect(screen.getByText("추가")).toBeInTheDocument()

    const addDeliveryButton = screen.getByText("추가")
    userEvent.click(addDeliveryButton)

    // 트래커를 추가 요청
    waitFor(() => {
      expect(
        useDependencies().controllers.tracker.addTracker
      ).toHaveBeenCalled()
    })

    waitFor(() => {
      // 트래커 추가 실패 시 에러 메시지를 설정
      expect(useError().setMessage).toHaveBeenCalled()
    })
  })

  test("배송조회 추가 버튼을 새로운 트래커를 생성한다. (성공)", async () => {
    ;(useDependencies as jest.Mock).mockReturnValue({
      controllers: {
        tracker: {
          addTracker: jest.fn().mockReturnValue({
            isError: false
          })
        }
      }
    })

    render(<CreateTracker />)

    expect(screen.getByText("추가")).toBeInTheDocument()

    const addDeliveryButton = screen.getByText("추가")
    userEvent.click(addDeliveryButton)

    // 트래커를 추가 요청
    waitFor(() => {
      expect(
        useDependencies().controllers.tracker.addTracker
      ).toHaveBeenCalled()
    })

    waitFor(() => {
      // 트래커 추가 성공 시 트래커 리스트를 리로드
      expect(useTrackers().getTrackers).toHaveBeenCalled()
    })
  })
})
