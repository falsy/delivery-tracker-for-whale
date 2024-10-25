import { create } from "zustand"

interface ErrorMessageState {
  errMessage: string
  setErrMessage: (message?: string) => void
}

export const useErrorMessage = create<ErrorMessageState>((set) => ({
  errMessage: "",
  setErrMessage: (message = "error") => set({ errMessage: message })
}))
