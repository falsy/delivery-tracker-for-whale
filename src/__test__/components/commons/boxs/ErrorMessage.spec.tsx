import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ErrorMessage from "@components/commons/boxs/ErrorMessage"

import useError from "@hooks/useError"

jest.mock("@hooks/useError")

describe("ErrorMessage", () => {
  test("ErrorMessage 컴포넌트 렌더링 확인", () => {
    ;(useError as jest.Mock).mockReturnValue({
      message: "test",
      setMessage: jest.fn()
    })

    render(<ErrorMessage />)

    expect(screen.getByText("test")).toBeInTheDocument()
  })

  test("ErrorMessage 컴포넌트 메시지 파라미터가 없다면 렌더링 하지 않음", () => {
    ;(useError as jest.Mock).mockReturnValue({
      message: "",
      setMessage: jest.fn()
    })

    const { container } = render(<ErrorMessage />)

    expect(container.firstChild).toBeNull()
  })

  test("ErrorMessage 컴포넌트 닫기 버튼 클릭 시 컴포넌트가 언마운트", () => {
    ;(useError as jest.Mock).mockReturnValue({
      message: "test",
      setMessage: jest.fn()
    })

    const { container } = render(<ErrorMessage />)
    expect(screen.getByText("test")).toBeInTheDocument()

    const closeButton = screen.getByRole("button")
    userEvent.click(closeButton)

    waitFor(() => {
      expect(container.firstChild).toBeNull()
    })
  })
})
