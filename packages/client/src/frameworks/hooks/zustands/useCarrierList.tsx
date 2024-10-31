import { create } from "zustand"
import ICarrier from "@domains/entities/interfaces/ICarrier"

type Carriers = {
  carriers: ICarrier[]
  setCarriers: (carriers: ICarrier[]) => void
}

export const useCarrierList = create<Carriers>((set) => ({
  carriers: [],
  setCarriers: (carriers) => set({ carriers })
}))
