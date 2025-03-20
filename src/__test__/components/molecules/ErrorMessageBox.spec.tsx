import { vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import useError from "@hooks/useError"
import ErrorMessageBox from "@components/molecules/ErrorMessageBox"

vi.mock("@hooks/useError")

describe("ErrorMessageBox", () => {
  it("에러 메시지가 없을 때 렌더링되지 않는지 확인", () => {
    ;(useError as jest.Mock).mockReturnValue({
      message: "",
      resetMessage: vi.fn()
    })

    render(<ErrorMessageBox />)

    expect(
      screen.queryByText("알 수 없는 오류가 발생하였습니다.")
    ).not.toBeInTheDocument()
  })

  it("에러 메시지가 있을 때 올바르게 렌더링되는지 확인", () => {
    ;(useError as jest.Mock).mockReturnValue({
      message: "테스트 에러",
      resetMessage: vi.fn()
    })

    render(<ErrorMessageBox />)

    expect(screen.getByText("테스트 에러")).toBeInTheDocument()
  })

  it('"error" 메시지가 있을 때 "알 수 없는 오류가 발생하였습니다."로 표시되는지 확인', () => {
    ;(useError as jest.Mock).mockReturnValue({
      message: "error",
      resetMessage: vi.fn()
    })

    render(<ErrorMessageBox />)

    expect(
      screen.getByText("알 수 없는 오류가 발생하였습니다.")
    ).toBeInTheDocument()
  })

  it("닫기 버튼 클릭 시 resetMessage 핸들러가 호출되는지 확인", () => {
    const resetMessageMock = vi.fn()

    ;(useError as jest.Mock).mockReturnValue({
      message: "테스트 에러",
      resetMessage: resetMessageMock
    })

    render(<ErrorMessageBox />)

    const closeButton = screen.getByRole("button")
    fireEvent.click(closeButton)

    expect(resetMessageMock).toHaveBeenCalledTimes(1) // ✅ resetMessage가 한 번 호출되었는지 검증
  })
})
