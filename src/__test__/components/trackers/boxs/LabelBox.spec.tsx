/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TrackerDTO from "@core/dtos/TrackerDTO"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import LabelBox from "@components/trackers/boxs/LabelBox"

jest.mock("@hooks/useDependencies")
jest.mock("@hooks/useError")
jest.mock("@hooks/useTrackers")

describe("LabelBox 컴포넌트", () => {
  const tracker = new TrackerDTO({
    id: "aaa",
    carrierId: "carrierId",
    label: "initial label",
    trackingNumber: "1234",
    memos: []
  })

  beforeEach(() => {
    ;(useDependencies as any).mockReturnValue({
      controllers: {
        tracker: {
          updateLabel: jest.fn()
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

  test("초기 렌더링 시 input에 tracker.label 값이 설정되어야 한다", () => {
    render(<LabelBox trackerId={"aaa"} />)
    const input = screen.getByPlaceholderText(
      "이곳에 배송에 대한 간단한 메모를 적을 수 있어요."
    )
    expect(input).toHaveValue("initial label")
  })

  test("input의 값을 변경했을 때 updateLabel 함수가 호출되어야 한다", async () => {
    ;(useDependencies as jest.Mock).mockReturnValue({
      controllers: {
        tracker: {
          updateLabel: jest.fn().mockReturnValue({
            isError: false
          })
        }
      }
    })

    render(<LabelBox trackerId={"aaa"} />)
    const input = screen.getByPlaceholderText(
      "이곳에 배송에 대한 간단한 메모를 적을 수 있어요."
    )

    await userEvent.clear(input)
    await userEvent.type(input, "new label")

    expect(
      useDependencies().controllers.tracker.updateLabel
    ).toHaveBeenCalledWith(tracker, "new label")
  })

  test("updateLabel에서 에러가 발생할 경우, 이전 값으로 복원되고 에러 메시지가 설정되어야 한다", async () => {
    ;(useDependencies as jest.Mock).mockReturnValue({
      controllers: {
        tracker: {
          updateLabel: jest.fn().mockReturnValue({
            isError: true
          })
        }
      }
    })
    ;(useError as any).mockReturnValue({
      setMessage: jest.fn().mockReturnValue({
        isError: true
      })
    })

    render(<LabelBox trackerId={"aaa"} />)
    const input = screen.getByPlaceholderText(
      "이곳에 배송에 대한 간단한 메모를 적을 수 있어요."
    )

    // 값 변경
    await userEvent.clear(input)
    await userEvent.type(input, "new label")

    // updateLabel이 실패했을 때, 원래 값으로 복원되고 에러 메시지가 설정되어야 함
    expect(input).toHaveValue("initial label")
    expect(useError().setMessage).toHaveBeenCalled()
  })
})
