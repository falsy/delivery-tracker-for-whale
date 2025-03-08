/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import useError from "@hooks/useError"
import ErrorMessage from "@containers/commons/boxs/ErrorMessage"

vi.mock("@hooks/useError")

describe("ErrorMessage", () => {
  it("ErrorMessage 컴포넌트 렌더링 확인", () => {
    ;(useError as any).mockReturnValue({
      message: "test",
      setMessage: vi.fn()
    })

    render(<ErrorMessage />)

    expect(screen.getByText("test")).toBeInTheDocument()
  })

  it("ErrorMessage 컴포넌트 메시지 파라미터가 없다면 렌더링 하지 않음", () => {
    ;(useError as any).mockReturnValue({
      message: "",
      setMessage: vi.fn()
    })

    const { container } = render(<ErrorMessage />)

    expect(container.firstChild).toBeNull()
  })

  it("ErrorMessage 컴포넌트 닫기 버튼 클릭 시 컴포넌트가 언마운트", async () => {
    const resetMessage = vi.fn()
    ;(useError as any).mockReturnValue({
      message: "test",
      resetMessage: resetMessage
    })

    render(<ErrorMessage />)
    expect(screen.getByText("test")).toBeInTheDocument()

    const closeButton = screen.getByRole("button")
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(resetMessage).toHaveBeenCalled()
    })
  })
})
