import { create } from "zustand"
import ICarrierDTO from "../../../core/dtos/interfaces/ICarrierDTO"

type Carriers = {
  carriers: ICarrierDTO[]
  setCarriers: (carriers: ICarrierDTO[]) => void
}

export const useCarrierList = create<Carriers>((set) => ({
  carriers: [],
  setCarriers: (carriers) => set({ carriers })
}))
