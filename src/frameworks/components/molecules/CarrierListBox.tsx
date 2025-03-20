import ICarrier from "@domains/entities/interfaces/ICarrier"
import Listbox from "@components/atoms/Listbox"

export default function CarrierListBox({
  carrier,
  carriers,
  changeCarrierId
}: {
  carrier: ICarrier
  carriers: ICarrier[]
  changeCarrierId: (carrierId: string) => void
}) {
  return (
    <div>
      <Listbox
        list={carriers.map((c) => ({ id: c.id, name: c.displayName }))}
        selected={{ id: carrier.id, name: carrier.displayName }}
        onChange={(selected) => changeCarrierId(selected.id)}
      />
    </div>
  )
}
