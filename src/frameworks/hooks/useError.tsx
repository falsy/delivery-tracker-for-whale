import { useErrorMessage } from "./zustands/useErrorMessage"

export default function useError() {
  const { errMessage, setErrMessage } = useErrorMessage()

  return {
    message: errMessage,
    setMessage: setErrMessage
  }
}
