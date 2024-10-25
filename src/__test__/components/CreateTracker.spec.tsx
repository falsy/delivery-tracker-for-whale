// import { fireEvent, render, screen, waitFor } from "@testing-library/react"

// import useDependencies from "../../frameworks/hooks/useDependencies"
// import { useErrorMessage } from "../../frameworks/hooks/zustands/useErrorMessage"
// import CreateTracker from "../../frameworks/components/trackers/CreateTracker"

// jest.mock("../../frameworks/hooks/useDependencies")
// jest.mock("../../frameworks/hooks/useErrorMessage")

// describe("배송조회 추가 버튼", () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//     ;(useErrorMessage as unknown as jest.Mock).mockReturnValue({
//       setErrMessage: jest.fn()
//     })
//     ;(useDependencies as jest.Mock).mockReturnValue({
//       controllers: {
//         tracker: {
//           addTracker: jest.fn().mockReturnValue(true)
//         }
//       }
//     })
//   })

//   test("배송조회 추가 버튼이 정상적으로 렌더링 되어야 한다.", () => {
//     render(<CreateTracker />)

//     expect(screen.getByText("추가")).toBeInTheDocument()
//   })

//   test("배송조회 추가 버튼을 누르면 props 함수를 호출한다.", async () => {
//     render(<CreateTracker />)

//     expect(screen.getByText("추가")).toBeInTheDocument()

//     const addDeliveryButton = screen.getByText("추가")

//     fireEvent.click(addDeliveryButton)

//     await waitFor(() => {
//       expect(getTrackerList).toHaveBeenCalled()
//     })
//   })
// })
