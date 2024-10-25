import { useCarrierList } from "./zustands/useCarrierList"

export default function useCarriers() {
  const { carriers, setCarriers } = useCarrierList()

  return {
    carriers,
    setCarriers
  }
}
