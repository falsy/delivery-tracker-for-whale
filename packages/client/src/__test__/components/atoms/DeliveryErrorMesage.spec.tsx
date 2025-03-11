import { render, screen } from "@testing-library/react"
import DeliveryErrorMessage from "@components/atoms/DeliveryErrorMessage"

describe("DeliveryErrorMessage", () => {
  it("전달된 메시지가 정상적으로 렌더링되는지 확인", () => {
    const errorMessage = "배송 오류가 발생했습니다."
    render(<DeliveryErrorMessage message={errorMessage} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
