import Listbox from "@components/atoms/Listbox"
import ICarrier from "@domains/entities/interfaces/ICarrier"

export default function CarrierListBox({
  carriers,
  carrier,
  changeCarrierId
}: {
  carriers: ICarrier[]
  carrier: ICarrier
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
