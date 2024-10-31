import ITracker from "@domains/entities/interfaces/ITracker"
import { create } from "zustand"

type Trackers = {
  trackers: ITracker[]
  setTrackers: (Trackers: ITracker[]) => void
}

export const useTrackerList = create<Trackers>((set) => ({
  trackers: [],
  setTrackers: (trackers) => set({ trackers })
}))
