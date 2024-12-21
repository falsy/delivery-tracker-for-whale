import { useAtom } from "jotai"
import { errorMessageAtom } from "./atoms/errorMessageAtom"

export default function useError() {
  const [message, setMessage] = useAtom(errorMessageAtom)

  const handleChangeMessage = (message: string = "error") => {
    setMessage(message)
  }

  return {
    message,
    setMessage: handleChangeMessage
  }
}
