/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, waitFor } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import useCarriers from "@hooks/useCarriers"
import useTrackers from "@hooks/useTrackers"
import Migration from "@services/Migration"
import Dashboard from "@pages/Dashboard"

vi.mock("@hooks/useCarriers")
vi.mock("@hooks/useTrackers")
vi.mock("@services/Migration")

describe("Dashboard", () => {
  const mockSetCarriers = vi.fn()
  const mockGetCarriers = vi.fn()
  const mockMigration = vi.fn()
  const mockGetTrackers = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useCarriers as any).mockReturnValue({
      carriers: [],
      getCarriers: mockGetCarriers,
      setCarriers: mockSetCarriers
    })
    ;(useTrackers as any).mockReturnValue({
      isPending: false,
      getTrackers: mockGetTrackers
    })
    ;(Migration as any).mockImplementation(() => ({
      migration: mockMigration
    }))
  })

  it("컴포넌트가 렌더링될 때 getCarrierList 함수가 호출되어야 한다", async () => {
    mockGetCarriers.mockResolvedValue({ isError: false, data: [] })

    render(<Dashboard />)

    await waitFor(() => {
      expect(mockGetCarriers).toHaveBeenCalled()
    })
  })

  it("carriers가 업데이트되면 Migration 후 getTrackers가 호출되어야 한다", async () => {
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
