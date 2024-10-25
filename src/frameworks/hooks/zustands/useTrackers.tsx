import { create } from "zustand"
import ITrackerDTO from "../../../core/dtos/interfaces/ITrackerDTO"

type Trackers = {
  trackers: ITrackerDTO[]
  setTrackers: (Trackers: ITrackerDTO[]) => void
}

export const useTrackers = create<Trackers>((set) => ({
  trackers: [],
  setTrackers: (trackers) => set({ trackers })
}))
