/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, waitFor } from "@testing-library/react"
import Dashboard from "@components/Dashboard"
import useDependencies from "@hooks/useDependencies"
import useError from "@hooks/useError"
import useTrackers from "@hooks/useTrackers"
import useCarriers from "@hooks/useCarriers"
import Migration from "@services/Migration"

jest.mock("@hooks/useDependencies")
jest.mock("@hooks/useError")
jest.mock("@hooks/useTrackers")
jest.mock("@hooks/useCarriers")
jest.mock("@services/Migration")

describe("Dashboard", () => {
  const mockSetMessage = jest.fn()
  const mockSetCarriers = jest.fn()
  const mockGetTrackers = jest.fn()
  const mockGetCarriers = jest.fn()
  const mockMigration = jest.fn()

  beforeEach(() => {
    ;(useDependencies as any).mockReturnValue({
      controllers: {
        carrier: { getCarriers: mockGetCarriers }
      }
    })
    ;(useError as any).mockReturnValue({
      setMessage: mockSetMessage
    })
    ;(useTrackers as any).mockReturnValue({
      trackers: [],
      getTrackers: mockGetTrackers
    })
    ;(useCarriers as any).mockReturnValue({
      carriers: [],
      setCarriers: mockSetCarriers
    })
    ;(Migration as jest.Mock).mockImplementation(() => ({
      migration: mockMigration
    }))
  })

  test("컴포넌트가 렌더링될 때 getCarrierList 함수가 호출되어야 한다", async () => {
    mockGetCarriers.mockResolvedValue({ isError: false, data: [] })

    render(<Dashboard />)

    await waitFor(() => {
      expect(mockGetCarriers).toHaveBeenCalled()
    })
  })

  test("getCarrierList에서 에러 발생 시 setMessage 함수가 호출되어야 한다", async () => {
    mockGetCarriers.mockResolvedValue({
      isError: true,
      message: "Failed to fetch carriers"
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith("Failed to fetch carriers")
    })
  })

  test("carriers가 업데이트되면 Migration 후 getTrackers가 호출되어야 한다", async () => {
    mockGetCarriers.mockResolvedValue({ isError: false, data: [{ id: "1" }] })
    ;(useCarriers as any).mockReturnValue({
      carriers: [{ id: "1" }],
      setCarriers: mockSetCarriers
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(mockMigration).toHaveBeenCalled()
      expect(mockGetTrackers).toHaveBeenCalled()
    })
  })
})
