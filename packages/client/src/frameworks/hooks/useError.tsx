import { atom, useAtom } from "jotai"

const errorMessageAtom = atom("")

export default function useError() {
  const [message, setMessage] = useAtom(errorMessageAtom)

  const handleChangeMessage = (message: string = "error") => {
    setMessage(message)
  }

  const handleResetMessage = () => {
    setMessage("")
  }

  return {
    message,
    setMessage: handleChangeMessage,
    resetMessage: handleResetMessage
  }
}
