/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, waitFor } from "@testing-library/react"
import useCarriers from "@hooks/useCarriers"
import useTrackers from "@hooks/useTrackers"
import Migration from "@services/Migration"
import Dashboard from "@pages/Dashboard"

jest.mock("@hooks/useCarriers")
jest.mock("@hooks/useTrackers")
jest.mock("@services/Migration")

describe("Dashboard", () => {
  const mockSetCarriers = jest.fn()
  const mockGetCarriers = jest.fn()
  const mockMigration = jest.fn()
  const mockGetTrackers = jest.fn()

  beforeEach(() => {
    ;(useCarriers as any).mockReturnValue({
      carriers: [],
      getCarriers: mockGetCarriers,
      setCarriers: mockSetCarriers
    })
    ;(useTrackers as any).mockReturnValue({
      isPending: false,
      getTrackers: mockGetTrackers
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

  test("carriers가 업데이트되면 Migration 후 getTrackers가 호출되어야 한다", async () => {
    mockGetCarriers.mockResolvedValue({ isError: false, data: [{ id: "1" }] })
    mockGetTrackers.mockResolvedValue({ isError: false, data: [] })
    ;(useCarriers as any).mockReturnValue({
      carriers: [{ id: "1" }],
      getCarriers: mockGetCarriers,
      setCarriers: mockSetCarriers
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(mockMigration).toHaveBeenCalled()
      expect(mockGetTrackers).toHaveBeenCalled()
    })
  })
})
