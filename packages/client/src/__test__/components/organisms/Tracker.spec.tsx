import { vi } from "vitest"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import ITracker from "@domains/entities/interfaces/ITracker"
import useCarriers from "@hooks/useCarriers"
import useTrackers from "@hooks/useTrackers"
import Tracker from "@components/organisms/Tracker"
import carriers from "../../mocks/carrierMock"

vi.mock("@hooks/useCarriers", () => ({
  __esModule: true,
  default: vi.fn()
}))

vi.mock("@hooks/useTrackers", () => ({
  __esModule: true,
  default: vi.fn()
}))

describe("Tracker", () => {
  const mockCarrier = carriers[0]

  const mockTracker: ITracker = {
    id: "tracker-1",
    carrierId: "2de90e9c-1fda-11ef-8884-0a8cb08d3aea",
    trackingNumber: "123456789",
    label: "내 택배",
    memos: []
  }

  const mockDeleteTracker = vi.fn()
  const patchTrackerMock = vi.fn()
  const getDeliveryMock = vi.fn()
  const clearDeliveryMock = vi.fn()

  beforeEach(() => {
    vi.resetAllMocks()

    vi.mocked(useCarriers).mockReturnValue({
      isPending: false,
      carriers: [mockCarrier],
      getCarriers: vi.fn(),
      getCachedCarriers: vi.fn(),
      setCarriers: vi.fn()
    })

    vi.mocked(useTrackers).mockReturnValue({
      isPending: false,
      trackers: [],
      getTrackers: vi.fn(),
      clearTrackers: vi.fn(),
      createTracker: vi.fn(),
      deleteTracker: vi.fn(),
      delivery: null,
      deliveryErrorMessage: "",
      patchTracker: patchTrackerMock,
      getDelivery: getDeliveryMock,
      clearDelivery: clearDeliveryMock
    })
  })

  it("Tracker 컴포넌트가 정상적으로 렌더링되는지 확인", () => {
    render(<Tracker tracker={mockTracker} deleteTracker={mockDeleteTracker} />)

    expect(screen.getByDisplayValue("내 택배")).toBeInTheDocument()
    expect(screen.getByDisplayValue("123456789")).toBeInTheDocument()
    expect(screen.getByText("우체국 택배")).toBeInTheDocument()
  })

  it("운송장 번호 변경 시 patchTracker가 호출되는지 확인", async () => {
    render(<Tracker tracker={mockTracker} deleteTracker={mockDeleteTracker} />)

    const input = screen.getByPlaceholderText("운송장 번호를 입력해주세요.")
    fireEvent.change(input, { target: { value: "987654321" } })

    await waitFor(() => {
      expect(patchTrackerMock).toHaveBeenCalledTimes(1)
      expect(patchTrackerMock).toHaveBeenCalledWith("tracker-1", {
        trackingNumber: "987654321"
      })
    })
  })

  it("운송장 조회 버튼 클릭 시 getDelivery가 호출되는지 확인", () => {
    render(<Tracker tracker={mockTracker} deleteTracker={mockDeleteTracker} />)

    const submitButton = screen.getByRole("button", { name: "submit-button" })
    fireEvent.click(submitButton)

    expect(getDeliveryMock).toHaveBeenCalledTimes(1)
    expect(getDeliveryMock).toHaveBeenCalledWith(mockCarrier, "123456789")
  })

  it("삭제 버튼 클릭 시 deleteTracker가 호출되는지 확인", () => {
    render(<Tracker tracker={mockTracker} deleteTracker={mockDeleteTracker} />)

    const deleteButton = screen.getByRole("button", {
      name: "delete-button"
    })
    fireEvent.click(deleteButton)

    expect(mockDeleteTracker).toHaveBeenCalledTimes(1)
    expect(mockDeleteTracker).toHaveBeenCalledWith("tracker-1")
  })

  it("배송 데이터가 있으면 StateBox가 렌더링되는지 확인", async () => {
    vi.mocked(useTrackers).mockReturnValue({
      isPending: false,
      trackers: [],
      getTrackers: vi.fn(),
      clearTrackers: vi.fn(),
      createTracker: vi.fn(),
      deleteTracker: vi.fn(),
      delivery: {
        from: { name: "서울", time: "" },
        to: { name: "부산", time: "" },
        state: { id: "1", name: "배송 완료" },
        progresses: [
          {
            state: { id: "1", name: "배송 출발" },
            time: "2025-03-11 10:00",
            location: "서울센터",
            description: "배송이 시작되었습니다."
          },
          {
            state: { id: "2", name: "배송 중" },
            time: "2025-03-11 12:30",
            location: "경기 물류센터",
            description: "물류센터에서 이동 중입니다."
          },
          {
            state: { id: "3", name: "배송 완료" },
            time: "2025-03-11 15:00",
            location: "부산 고객 주소",
            description: "배송이 완료되었습니다."
          }
        ]
      },
      deliveryErrorMessage: "",
      patchTracker: patchTrackerMock,
      getDelivery: getDeliveryMock,
      clearDelivery: clearDeliveryMock
    })

    render(<Tracker tracker={mockTracker} deleteTracker={mockDeleteTracker} />)

    await waitFor(() => {
      expect(screen.getByText(/배송 중/)).toBeInTheDocument()
    })
  })

  it("배송 에러 메시지가 있으면 StateBox에 에러 메시지가 표시되는지 확인", () => {
    vi.mocked(useTrackers).mockReturnValue({
      isPending: false,
      trackers: [],
      getTrackers: vi.fn(),
      clearTrackers: vi.fn(),
      createTracker: vi.fn(),
      deleteTracker: vi.fn(),
      delivery: null,
      deliveryErrorMessage: "배송 정보를 찾을 수 없습니다.",
      patchTracker: patchTrackerMock,
      getDelivery: getDeliveryMock,
      clearDelivery: clearDeliveryMock
    })

    render(<Tracker tracker={mockTracker} deleteTracker={mockDeleteTracker} />)

    expect(
      screen.getByText("배송 정보를 찾을 수 없습니다.")
    ).toBeInTheDocument()
  })
})
